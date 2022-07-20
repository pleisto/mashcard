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
  BlockInput,
  Block
} from '@mashcard/schema'

export interface SpreadsheetColumn {
  uuid: string
  title?: string
  sort: number
  width?: number
}

export interface SpreadsheetColumns extends Array<SpreadsheetColumn> {}

export interface SpreadsheetRows extends Array<BlockInput> {}

export interface SpreadsheetCellsMap extends Map<string, Map<string, BlockInput>> {}

export function useSpreadsheet(options: {
  isNew: boolean
  parentId: string
  data: Record<string, any>
  updateAttributeData: (data: Record<string, any>) => void
}): {
  columns: SpreadsheetColumns
  addColumn: (index?: number) => void
  updateColumn: (column: SpreadsheetColumn) => void
  removeColumn: (column: SpreadsheetColumn) => void
  moveColumn: (srcId: string, targetId: string) => void
  rows: SpreadsheetRows
  addRow: (index?: number) => void
  removeRow: (index: number) => void
  moveRow: (srcId: string, targetId: string) => void
  getCellBlock: (rowId: string, columnId: string) => BlockInput
  saveCellBlock: (block: BlockInput) => void
  cellsMap: SpreadsheetCellsMap
} {
  const { isNew, parentId, data, updateAttributeData } = options
  const [columns, setColumns] = React.useState<SpreadsheetColumns>(data.columns ?? [])
  // const latestColumns = React.useRef<SpreadsheetColumns>(columns)
  const latestRowsCount = React.useRef<number>(data.rowsCount || 0)
  // const latestRows = React.useRef<SpreadsheetRows>([])

  const isNewRef = React.useRef<boolean>(isNew)
  const [rows, setRows] = React.useState<SpreadsheetRows>([])

  const blocksMap = React.useRef<Map<string, BlockInput>>(new Map<string, BlockInput>())
  const cellsMap = React.useRef<SpreadsheetCellsMap>(new Map<string, Map<string, BlockInput>>())

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

  MashcardEventBus.subscribe(
    SpreadsheetLoaded,
    e => {
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
  )

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
    (column: SpreadsheetColumn): void => {
      const oldColumns = columns.filter(c => c.uuid !== column.uuid)
      updateSpreadsheetAttributes(
        [...oldColumns.slice(0, column.sort), column, ...oldColumns.slice(column.sort)].map((c, i) => ({
          ...c,
          sort: i
        }))
      )
    },
    [columns, updateSpreadsheetAttributes]
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
    (rowId: string, columnId: string): BlockInput => {
      let block = cellsMap.current.get(rowId)?.get(columnId)
      if (!block) {
        block = {
          id: uuid(),
          sort: 0,
          type: 'spreadsheetCell',
          parentId: rowId, // Save rowId to cell block parentId
          content: [],
          meta: {},
          text: '',
          data: { columnId, formulaId: uuid() }
        }
        setBlockToCellsMap(block)
      }
      return block
    },
    [setBlockToCellsMap]
  )

  // const getCellBlockByIdx = React.useCallback(
  //   (rowIdx: number, columnIdx: number): BlockInput => {
  //     return getCellBlock(
  //       rows[rowIdx].id,
  //       columns[columnIdx].uuid
  //     )
  //   },
  //   [rows, columns]
  // )

  // const getCellIdxByBlockId = React.useCallback(
  //   (blockId: string): ([number, number] | undefined) => {
  //     const block = blocksMap.current.get(blockId)
  //     if (block) {
  //       const rowId = block.parentId
  //       const { columnId } = block.data
  //       const rowIdx = rows.findIndex(row => row.id === rowId)
  //       const columnIdx = columns.findIndex(column => column.uuid === columnId)
  //       return [rowIdx, columnIdx]
  //     }
  //     return undefined
  //   },
  //   [rows, columns]
  // )

  const saveCellBlock = React.useCallback(
    (block: BlockInput): void => {
      devLog(`Saving cell block`, block)
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
    cellsMap: cellsMap.current
  }
}
