import React from 'react'
import { v4 as uuid } from 'uuid'
import { isEqual } from 'lodash-es'
import {
  BrickdocEventBus,
  Event,
  UpdateBlock,
  DeleteBlock,
  CommitBlocks,
  loadSpreadsheetBlocks,
  SpreadsheetLoaded,
  BlockInput
} from '@brickdoc/schema'

export interface SpreadsheetColumn {
  uuid: string
  title?: string
  sort: number
}

export interface SpreadsheetColumns extends Array<SpreadsheetColumn> {}

export interface SpreadsheetRows extends Array<BlockInput> {}

export interface SpreadsheetCellsMap extends Map<string, Map<string, BlockInput>> {}

export const useSpreadsheet = (options: {
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
} => {
  const { parentId, data, updateAttributeData } = options
  const columns = data.columns ?? []
  const latestColumns = React.useRef<SpreadsheetColumns>(columns)
  const latestRowsCount = React.useRef<number>(data.rowsCount || 0)
  // const latestRows = React.useRef<SpreadsheetRows>([])

  const [rows, setRows] = React.useState<SpreadsheetRows>([])

  const blocksMap = React.useRef<Map<string, BlockInput>>(new Map<string, BlockInput>())
  const cellsMap = React.useRef<SpreadsheetCellsMap>(new Map<string, Map<string, BlockInput>>())

  const updateSpreadsheetAttributes = React.useCallback((): void => {
    updateAttributeData({
      ...data,
      columns: latestColumns.current,
      rowsCount: latestRowsCount.current
    })
  }, [updateAttributeData, data])

  const loaded = React.useRef(columns.length === 0 && data.rowsCount === 0)

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

  const setBlockToCellsMap = (block: BlockInput): void => {
    const rowId = block.parentId
    if (rowId) {
      let rowCellsMap = cellsMap.current.get(rowId)
      if (!rowCellsMap) {
        rowCellsMap = new Map<string, BlockInput>()
        cellsMap.current.set(rowId, rowCellsMap)
      }
      rowCellsMap.set(block.data.columnId, block)
    }
  }

  BrickdocEventBus.subscribe(
    SpreadsheetLoaded,
    (e: Event) => {
      const { parentId, blocks } = e.payload
      console.log(`loaded spreadsheet ${parentId}`)
      console.log(blocks)
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
              console.log(`Saving row block ${newBlock.id}`)
              BrickdocEventBus.dispatch(UpdateBlock({ block: newBlock }))
              blocksMap.current.set(block.id, newBlock)
            }
            return newBlock
          })
      )
      toDeleteRowIds.forEach(rowId => {
        BrickdocEventBus.dispatch(DeleteBlock({ blockId: rowId }))
        const rowCellsMap = cellsMap.current.get(rowId)
        if (rowCellsMap) {
          rowCellsMap.forEach(block => {
            if (blocksMap.current.get(block.id)) {
              BrickdocEventBus.dispatch(DeleteBlock({ blockId: block.id }))
            }
          })
        }
      })
      latestRowsCount.current = newRows.length
      updateSpreadsheetAttributes()
      BrickdocEventBus.dispatch(CommitBlocks({}))
    },
    [updateSpreadsheetAttributes, rows]
  )

  const updateColumn = React.useCallback(
    (column: SpreadsheetColumn): void => {
      const oldColumns = latestColumns.current.filter(c => c.uuid !== column.uuid)
      latestColumns.current = [...oldColumns.slice(0, column.sort), column, ...oldColumns.slice(column.sort)].map(
        (c, i) => ({ ...c, sort: i })
      )
      updateSpreadsheetAttributes()
    },
    [updateSpreadsheetAttributes]
  )

  const addColumn = React.useCallback(
    (sort = -1): void => {
      const oldColumns = latestColumns.current
      const newColumn = {
        uuid: uuid(),
        sort: sort === -1 ? oldColumns.length : sort
      }
      updateColumn(newColumn)
    },
    [updateColumn]
  )

  const removeColumn = React.useCallback(
    (column: SpreadsheetColumn): void => {
      latestColumns.current = latestColumns.current
        .filter(c => c.uuid !== column.uuid)
        .map((c, i) => ({ ...c, sort: i }))
      updateSpreadsheetAttributes()
      // TODO: remove cell blocks of column
    },
    [updateSpreadsheetAttributes]
  )

  const moveColumn = React.useCallback(
    (srcId: string, targetId: string): void => {
      if (srcId !== targetId) {
        const oldColumn = latestColumns.current.find(c => c.uuid === srcId)
        if (oldColumn) {
          const oldColumns = latestColumns.current.filter(c => c.uuid !== srcId)
          const targetIdx = targetId === 'first' ? 0 : oldColumns.findIndex(c => c.uuid === targetId) + 1
          latestColumns.current = [...oldColumns.slice(0, targetIdx), oldColumn, ...oldColumns.slice(targetIdx)].map(
            (c, i) => ({ ...c, sort: i })
          )
          updateSpreadsheetAttributes()
        }
      }
    },
    [updateSpreadsheetAttributes]
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

  const getCellBlock = (rowId: string, columnId: string): BlockInput => {
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
  }

  const saveCellBlock = React.useCallback((block: BlockInput): void => {
    console.log(`Saving cell block`, block)
    setBlockToCellsMap(block)
    blocksMap.current.set(block.id, block)
    BrickdocEventBus.dispatch(UpdateBlock({ block }))
    BrickdocEventBus.dispatch(CommitBlocks({}))
  }, [])

  React.useEffect(() => {
    if (loaded.current) {
      if (latestColumns.current.length === 0 && latestRowsCount.current === 0) {
        latestColumns.current = [
          { uuid: uuid(), sort: 0 },
          { uuid: uuid(), sort: 1 }
        ]
        saveRowBlocks([getRowBlock(0), getRowBlock(1), getRowBlock(2)])
      }
    } else {
      BrickdocEventBus.dispatch(loadSpreadsheetBlocks(parentId))
    }
  }, [parentId, latestColumns, latestRowsCount, addColumn, saveRowBlocks, getRowBlock])

  return {
    columns: latestColumns.current,
    addColumn,
    updateColumn,
    removeColumn,
    moveColumn,
    rows,
    addRow,
    removeRow,
    moveRow,
    getCellBlock,
    saveCellBlock
  }
}
