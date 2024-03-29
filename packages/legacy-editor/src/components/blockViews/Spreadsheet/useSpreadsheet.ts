import React from 'react'
import { isEqual, uuid } from '@mashcard/active-support'
import { devLog } from '@mashcard/design-system'
import {
  MashcardEventBus,
  UpdateBlock,
  DeleteBlock,
  CommitBlocks,
  loadSpreadsheetBlocks,
  SpreadsheetLoaded,
  SpreadsheetAddRow,
  SpreadsheetAddColumn,
  SpreadsheetUpdateCellValue,
  SpreadsheetUpdateCellValueByIdx,
  BlockInput,
  Block
} from '@mashcard/schema'
import { useEditorContext, useEditorI18n } from '../../../hooks'
import { getFormulaContext } from '../FormulaView'
import { useFormulaSpreadsheet } from './useFormulaSpreadsheet'

export interface SpreadsheetColumn {
  uuid: string
  title?: string
  sort: number
  width?: number
}

export interface SpreadsheetUpdateCell {
  parentId: string
  rowIdx: number
  columnIdx: number
  value: string
}

export interface SpreadsheetColumns extends Array<SpreadsheetColumn> {}

export interface SpreadsheetRows extends Array<BlockInput> {}

export interface SpreadsheetCellsMap extends Map<string, Map<string, BlockInput>> {}

export function useSpreadsheet(options: {
  isNew: boolean
  parentId: string
  title: string
  data: Record<string, any>
  updateAttributeData: (data: Record<string, any>) => void
}): {
  columns: SpreadsheetColumns
  addColumn: (index?: number) => void
  updateColumn: (column: SpreadsheetColumn) => string | undefined
  removeColumn: (column: SpreadsheetColumn) => void
  moveColumn: (srcId: string, targetId: string) => void
  rows: SpreadsheetRows
  addRow: (index?: number) => void
  removeRow: (index: number) => void
  moveRow: (srcId: string, targetId: string) => void
  getCellBlock: (spreadsheetId: string, rowId: string, columnId: string) => BlockInput
  saveCellBlock: (block: BlockInput) => void
  deleteSpreadsheet: () => void
  cellsMap: SpreadsheetCellsMap
} {
  const [t] = useEditorI18n()
  const { editor } = useEditorContext()
  const formulaContext = getFormulaContext(editor)
  const { isNew, parentId, data, updateAttributeData, title } = options
  const [columns, setColumns] = React.useState<SpreadsheetColumns>(data.columns ?? [])
  // const latestColumns = React.useRef<SpreadsheetColumns>(columns)
  const latestRowsCount = React.useRef<number>(data.rowsCount || 0)
  // const latestRows = React.useRef<SpreadsheetRows>([])

  const isNewRef = React.useRef<boolean>(isNew)
  const [rows, setRows] = React.useState<SpreadsheetRows>([])

  const blocksMap = React.useRef<Map<string, BlockInput>>(new Map<string, BlockInput>())
  const cellsMap = React.useRef<SpreadsheetCellsMap>(new Map<string, Map<string, BlockInput>>())

  const addRowsQueue = React.useRef<number[]>([])
  const addColumnsQueue = React.useRef<number[]>([])
  const updateCellsQueue = React.useRef<SpreadsheetUpdateCell[]>([])

  const updateSpreadsheetAttributes = React.useCallback(
    (columns: any): void => {
      setColumns(columns)
      updateAttributeData({
        ...data,
        columns,
        rowsCount: latestRowsCount.current
      })
    },
    [updateAttributeData, data]
  )

  const loaded = React.useRef(false)

  const getRowBlock = React.useCallback(
    (index: number) => {
      return {
        id: uuid(),
        sort: index,
        type: 'spreadsheetRow',
        parentId,
        content: [],
        meta: {},
        text: '',
        data: {}
      }
    },
    [parentId]
  )

  const setBlockToCellsMap = React.useCallback((block: BlockInput): void => {
    const rowId = block.parentId
    if (rowId) {
      let rowCellsMap = cellsMap.current.get(rowId)
      if (!rowCellsMap) {
        rowCellsMap = new Map<string, BlockInput>()
        cellsMap.current.set(rowId, rowCellsMap)
      }
      rowCellsMap.set(block.data.columnId, block)
    }
  }, [])

  const saveRowBlocks = React.useCallback(
    (newRows: SpreadsheetRows): void => {
      const toDeleteRowIds = new Set(rows.map(r => r.id))
      setRows(
        newRows
          .filter(b => typeof b !== 'undefined')
          .map((block, i) => {
            toDeleteRowIds.delete(block.id)
            const oldBlock = blocksMap.current.get(block.id)
            const newBlock = { ...block, sort: i }
            if (!isEqual(oldBlock, newBlock)) {
              devLog(`Saving row block ${newBlock.id}`)
              MashcardEventBus.dispatch(UpdateBlock({ block: newBlock as Block }))
              blocksMap.current.set(block.id, newBlock)
            }
            return newBlock
          })
      )
      toDeleteRowIds.forEach(rowId => {
        MashcardEventBus.dispatch(DeleteBlock({ blockId: rowId }))
        const rowCellsMap = cellsMap.current.get(rowId)
        if (rowCellsMap) {
          rowCellsMap.forEach(block => {
            if (blocksMap.current.get(block.id)) {
              MashcardEventBus.dispatch(DeleteBlock({ blockId: block.id }))
            }
          })
        }
      })
      latestRowsCount.current = newRows.length
      updateSpreadsheetAttributes(columns)
      MashcardEventBus.dispatch(CommitBlocks({}))
    },
    [updateSpreadsheetAttributes, rows, columns]
  )

  const updateColumn = React.useCallback(
    (column: SpreadsheetColumn): string | undefined => {
      const oldColumns = columns.filter(c => c.uuid !== column.uuid)
      if (column.title && oldColumns.some(c => c.title === column.title)) {
        return `'${column.title}' ${t('spreadsheet.column.name_used')}`
      } else if (column.title && column.title === title) {
        return `'${column.title}' ${t('spreadsheet.column.name_used')}`
      }
      updateSpreadsheetAttributes(
        [...oldColumns.slice(0, column.sort), column, ...oldColumns.slice(column.sort)].map((c, i) => ({
          ...c,
          sort: i
        }))
      )
    },
    [columns, updateSpreadsheetAttributes, title, t]
  )

  const addColumn = React.useCallback(
    (sort = -1): void => {
      const newColumn = {
        uuid: uuid(),
        sort: sort === -1 ? columns.length : sort
      }
      updateColumn(newColumn)
    },
    [updateColumn, columns]
  )

  const removeColumn = React.useCallback(
    (column: SpreadsheetColumn): void => {
      updateSpreadsheetAttributes(columns.filter(c => c.uuid !== column.uuid).map((c, i) => ({ ...c, sort: i })))
      // TODO: remove cell blocks of column
    },
    [updateSpreadsheetAttributes, columns]
  )

  const moveColumn = React.useCallback(
    (srcId: string, targetId: string): void => {
      if (srcId !== targetId) {
        const oldColumn = columns.find(c => c.uuid === srcId)
        if (oldColumn) {
          const oldColumns = columns.filter(c => c.uuid !== srcId)
          const targetIdx = targetId === 'first' ? 0 : oldColumns.findIndex(c => c.uuid === targetId) + 1
          updateSpreadsheetAttributes(
            [...oldColumns.slice(0, targetIdx), oldColumn, ...oldColumns.slice(targetIdx)].map((c, i) => ({
              ...c,
              sort: i
            }))
          )
        }
      }
    },
    [updateSpreadsheetAttributes, columns]
  )

  const addRow = React.useCallback(
    (index = -1): void => {
      const oldRows = [...rows]
      const newIdx = index === -1 ? oldRows.length : index
      const row = getRowBlock(newIdx)
      saveRowBlocks([...oldRows.slice(0, newIdx), row, ...oldRows.slice(newIdx)])
    },
    [rows, saveRowBlocks, getRowBlock]
  )

  const removeRow = React.useCallback(
    (index: number): void => {
      const oldRows = [...rows]
      saveRowBlocks([...oldRows.slice(0, index), ...oldRows.slice(index + 1)])
    },
    [rows, saveRowBlocks]
  )

  const moveRow = React.useCallback(
    (srcId: string, targetId: string): void => {
      if (srcId !== targetId) {
        const oldRows = rows.filter(r => r.id !== srcId)
        const targetIdx = targetId === 'first' ? 0 : oldRows.findIndex(r => r.id === targetId) + 1
        saveRowBlocks([
          ...oldRows.slice(0, targetIdx),
          blocksMap.current.get(srcId) as BlockInput,
          ...oldRows.slice(targetIdx)
        ])
      }
    },
    [rows, saveRowBlocks]
  )

  const getCellBlock = React.useCallback(
    (spreadsheetId: string, rowId: string, columnId: string): BlockInput => {
      let block = cellsMap.current.get(rowId)?.get(columnId)
      if (!block) {
        // TODO: variable is not persisted cause circular dependency: A1: =A2 && A2: =A1
        // TODO: This should be refactored when we have formula state management.
        const formulaId =
          formulaContext?.findVariableByCellMeta({ spreadsheetId, columnId, rowId })?.t.meta.variableId ?? uuid()
        block = {
          id: uuid(),
          sort: 0,
          type: 'spreadsheetCell',
          parentId: rowId, // Save rowId to cell block parentId
          content: [],
          meta: {},
          text: '',
          data: { columnId, formulaId }
        }
        setBlockToCellsMap(block)
      }
      return block
    },
    [formulaContext, setBlockToCellsMap]
  )

  const { deleteSpreadsheet } = useFormulaSpreadsheet({
    spreadsheetId: parentId,
    formulaContext,
    rows,
    columns,
    getCellBlock,
    title
  })

  const saveCellBlock = React.useCallback(
    (block: BlockInput): void => {
      devLog(`Saving cell block`, block, cellsMap.current)
      setBlockToCellsMap(block)
      blocksMap.current.set(block.id, block)
      MashcardEventBus.dispatch(UpdateBlock({ block: block as Block }))
      MashcardEventBus.dispatch(CommitBlocks({}))
    },
    [setBlockToCellsMap]
  )

  React.useEffect(() => {
    if (isNewRef.current && latestRowsCount.current === 0) {
      // TODO: temp fix for delay tiptap doc quick update
      setTimeout(() => saveRowBlocks([getRowBlock(0), getRowBlock(1), getRowBlock(2)]), 50)
      isNewRef.current = false
      loaded.current = true
    } else if (!loaded.current) {
      MashcardEventBus.dispatch(loadSpreadsheetBlocks(parentId))
    }
  }, [parentId, columns, latestRowsCount, addColumn, saveRowBlocks, getRowBlock, updateSpreadsheetAttributes])

  const tryAddRow = React.useCallback(
    (rowIdx: number) => {
      if (rows[rowIdx - 1]) {
        addRow(rowIdx)
      } else {
        addRowsQueue.current.push(rowIdx)
      }
    },
    [addRow, rows]
  )

  const tryAddColumn = React.useCallback(
    (columnIdx: number) => {
      if (columns[columnIdx - 1]) {
        addColumn(columnIdx)
      } else {
        addColumnsQueue.current.push(columnIdx)
      }
    },
    [addColumn, columns]
  )

  React.useEffect(() => {
    const subscriptions = [
      MashcardEventBus.subscribe(
        SpreadsheetLoaded,
        e => {
          cellsMap.current = new Map<string, Map<string, BlockInput>>()
          const { parentId, blocks } = e.payload
          devLog(`loaded spreadsheet ${parentId}`, blocks)
          const newRows = [...rows]
          blocks.forEach((block: BlockInput) => {
            blocksMap.current.set(block.id, block)
            if (block.type === 'spreadsheetRow') {
              newRows[parseInt(block.sort, 10)] = block
            } else if (block.type === 'spreadsheetCell') {
              setBlockToCellsMap(block)
            }
          })
          setRows(newRows)
          loaded.current = true
        },
        { eventId: parentId, subscribeId: parentId }
      ),
      MashcardEventBus.subscribe(
        SpreadsheetAddRow,
        e => {
          const { idx } = e.payload
          tryAddRow(idx)
        },
        { eventId: parentId, subscribeId: parentId }
      ),
      MashcardEventBus.subscribe(
        SpreadsheetAddColumn,
        e => {
          const { idx } = e.payload
          tryAddColumn(idx)
        },
        { eventId: parentId, subscribeId: parentId }
      ),
      MashcardEventBus.subscribe(
        SpreadsheetUpdateCellValueByIdx,
        e => {
          updateCellsQueue.current.push(e.payload)
        },
        { eventId: parentId, subscribeId: parentId }
      )
    ]
    return () => subscriptions.forEach(s => s.unsubscribe())
  }, [tryAddRow, tryAddColumn, parentId, rows, setBlockToCellsMap])

  React.useEffect(() => {
    addRowsQueue.current.forEach((rowIdx, i) => {
      if (rows[rowIdx - 1]) {
        addRow(rowIdx)
        addRowsQueue.current.splice(i, 1)
      }
    })
    addColumnsQueue.current.forEach((columnIdx, i) => {
      if (columns[columnIdx - 1]) {
        addColumn(columnIdx)
        addColumnsQueue.current.splice(i, 1)
      }
    })
    updateCellsQueue.current.forEach((updateCell, i) => {
      const row = rows[updateCell.rowIdx]
      const column = columns[updateCell.columnIdx]
      if (row && column) {
        MashcardEventBus.dispatch(
          SpreadsheetUpdateCellValue({ parentId, cellId: `${row.id},${column.uuid}`, value: updateCell.value })
        )
        updateCellsQueue.current.splice(i, 1)
      }
    })
  }, [addRow, addColumn, rows, columns, parentId])

  return {
    columns,
    addColumn,
    updateColumn,
    removeColumn,
    moveColumn,
    rows,
    addRow,
    removeRow,
    moveRow,
    getCellBlock,
    saveCellBlock,
    deleteSpreadsheet,
    cellsMap: cellsMap.current
  }
}
