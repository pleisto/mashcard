import React from 'react'
import { devLog } from '@mashcard/design-system'
import {
  MashcardEventBus,
  SpreadsheetUpdateCellValue,
  SpreadsheetUpdateCellValueByIdx,
  SpreadsheetAddRow,
  SpreadsheetAddColumn
} from '@mashcard/schema'
import { parsePasteTable } from './helper'

export interface SpreadsheetSelectionCellId {
  columnId: string
  rowId: string
}

export interface SpreadsheetSelection {
  all?: boolean
  columnIds?: string[]
  rowIds?: string[]
  cellIds?: string[]
}

export interface SpreadsheetDragging {
  columnId?: string
  rowId?: string
  movementX?: number
  movementY?: number
  overColumnId?: string
  overRowId?: string
}

export interface SpreadsheetContext {
  hoverRowId: string
  setHoverRowId: (hoverRowId: string) => void
  selection: SpreadsheetSelection
  setSelection: (selection: SpreadsheetSelection) => void
  clearSelection: () => void
  selectRows: (rowIds: string[]) => void
  selectColumns: (columnIds: string[]) => void
  selectCell: (cellId: string) => void
  editingCellId: string
  setEditingCellId: (editingCellId: string) => void
  dragging: SpreadsheetDragging
  setDragging: (dragging: SpreadsheetDragging) => void
  copyToClipboard: (curSelections?: { columnIds?: string[]; rowIds?: string[]; cellIds?: string[] }) => void
  editable: boolean
}

export const keyDownMovements: {
  // movement: [row, column, if jump to next row when last column]
  [key: string]: [number, number, boolean]
} = {
  ArrowUp: [-1, 0, false],
  ArrowDown: [1, 0, false],
  ArrowLeft: [0, -1, false],
  ArrowRight: [0, 1, false],
  Tab: [0, 1, true]
}

export const useSpreadsheetContext = (options: {
  parentId?: string
  columnIds: string[]
  rowIds: string[]
  columnHeaders: Map<string, string>
  valuesMatrix: Map<string, Map<string, string>>
  editable?: boolean
}): SpreadsheetContext => {
  const [selection, setSelection] = React.useState<SpreadsheetSelection>({})
  const [dragging, setDragging] = React.useState<SpreadsheetDragging>({})
  const [hoverRowId, setHoverRowId] = React.useState<string>('')
  const [editingCellId, setEditingCellId] = React.useState<string>('')

  const { parentId, columnIds, rowIds, columnHeaders, valuesMatrix, editable } = options ?? {}

  const clearSelection = (): void => {
    setSelection({})
  }

  const selectRows = (rowIds: string[]): void => {
    setSelection({ rowIds })
  }

  const selectColumns = (columnIds: string[]): void => {
    setSelection({ columnIds })
  }

  const selectCell = (cellId: string): void => {
    setSelection({ cellIds: [...(selection.cellIds ?? []), cellId] })
  }

  const getSelectedIdx = React.useCallback(() => {
    const { cellIds, columnIds: selectedColumnIds, rowIds: selectedRowIds } = selection
    let rowIdx = rowIds.length
    let columnIdx = columnIds.length
    if (cellIds?.length === 1) {
      const [rowId, columnId] = cellIds[0].split(',')
      rowIdx = rowIds.indexOf(rowId)
      columnIdx = columnIds.indexOf(columnId)
    } else if (selectedColumnIds?.length === 1) {
      columnIdx = columnIds.indexOf(selectedColumnIds[0])
    } else if (selectedRowIds?.length === 1) {
      rowIdx = rowIds.indexOf(selectedRowIds[0])
    }
    return { rowIdx, columnIdx }
  }, [selection, rowIds, columnIds])

  const copyToClipboard = React.useCallback(
    (curSelections?: { columnIds?: string[]; rowIds?: string[]; cellIds?: string[] }): void => {
      const { cellIds, columnIds: selectedColumnIds, rowIds: selectedRowIds } = selection
      if (cellIds?.length === 1) {
        const [rowId, columnId] = cellIds[0].split(',')
        const value = valuesMatrix.get(rowId)?.get(columnId)
        if (value) {
          void navigator.clipboard.writeText(value)
        }
      } else if (selectedRowIds?.length) {
        const text = selectedRowIds
          .map(rowId => columnIds.map(columnId => valuesMatrix.get(rowId)?.get(columnId) ?? '').join('\t'))
          .join('\n')
        devLog('write row to clipboard', text)
        void navigator.clipboard.writeText(text)
      } else if (selectedColumnIds?.length) {
        const text = [
          selectedColumnIds.map(columnId => columnHeaders.get(columnId) ?? '').join('\t'),
          ...Array.from(valuesMatrix.values()).map(row =>
            selectedColumnIds.map(columnId => row.get(columnId) ?? '').join('\t')
          )
        ].join('\n')
        void navigator.clipboard.writeText(text)
      }
    },
    [selection, columnHeaders, columnIds, valuesMatrix]
  )

  const pasteToSpreadsheet = React.useCallback(
    (pasteMatrix: string[][], selection: SpreadsheetSelection) => {
      const { columnIds: selectedColumnIds } = selection
      let { rowIdx, columnIdx } = getSelectedIdx()
      if (rowIdx === rowIds.length) {
        rowIdx = 0
      }
      if (columnIdx === columnIds.length) {
        columnIdx = 0
      }
      let rowDelta = 0
      pasteMatrix.forEach((r: string[], ri: number) => {
        r.forEach((c: string, ci: number) => {
          const nRowIdx = rowIdx + ri + rowDelta
          const nColumnIdx = columnIdx + ci
          const rowId = rowIds[nRowIdx]
          const columnId = columnIds[nColumnIdx]
          if (selectedColumnIds?.includes(columnId) && ri === 0) {
            rowDelta -= 1
          } else if (rowId && columnId) {
            const cellId = `${rowId},${columnId}`
            MashcardEventBus.dispatch(SpreadsheetUpdateCellValue({ parentId: parentId!, cellId, value: c }))
          } else if (c && c.length > 0) {
            if (nRowIdx >= rowIds.length) {
              MashcardEventBus.dispatch(SpreadsheetAddRow({ parentId: parentId!, idx: nRowIdx }))
            }
            if (nColumnIdx >= columnIds.length) {
              MashcardEventBus.dispatch(SpreadsheetAddColumn({ parentId: parentId!, idx: nColumnIdx }))
            }
            MashcardEventBus.dispatch(
              SpreadsheetUpdateCellValueByIdx({ parentId: parentId!, rowIdx: nRowIdx, columnIdx: nColumnIdx, value: c })
            )
          }
        })
      })
    },
    [parentId, rowIds, columnIds, getSelectedIdx]
  )

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      if ((e.target as Element).closest('.mashcard-formula-editor')) return
      devLog(`key down ${e.code}`)
      const { cellIds, columnIds: selectedColumnIds, rowIds: selectedRowIds } = selection
      const thisSelected = cellIds?.length ?? selectedRowIds?.length ?? selectedColumnIds?.length
      if (thisSelected) {
        const movement = keyDownMovements[e.code]
        if (movement) {
          const { rowIdx, columnIdx } = getSelectedIdx()
          let nRowIdx = rowIdx + movement[0]
          let nColumnIdx = columnIdx + movement[1]
          if (movement[2]) {
            if (nColumnIdx >= columnIds.length) {
              nColumnIdx = 0
              nRowIdx += 1
              if (nRowIdx >= rowIds.length) nRowIdx = 0
            }
          } else if (nColumnIdx > columnIds.length) {
            nColumnIdx = 0
          }
          if (nColumnIdx < 0) nColumnIdx = columnIds.length
          if (nRowIdx > rowIds.length) nRowIdx = 0
          if (nRowIdx < 0) nRowIdx = rowIds.length
          if (nRowIdx === rowIds.length) {
            setSelection({ columnIds: [columnIds[nColumnIdx]] })
          } else if (nColumnIdx === columnIds.length) {
            setSelection({ rowIds: [rowIds[nRowIdx]] })
          } else {
            setSelection({ cellIds: [`${rowIds[nRowIdx]},${columnIds[nColumnIdx]}`] })
          }
          e.preventDefault()
          e.stopPropagation()
        }
      }
      if (e.code === 'KeyC') {
        copyToClipboard()
      }

      if (e.code === 'Backspace') {
        if (cellIds?.length && parentId) {
          cellIds.forEach(cellId => {
            MashcardEventBus.dispatch(SpreadsheetUpdateCellValue({ parentId, cellId, value: '' }))
          })
        }
      }
    }
    const onPaste = (e: ClipboardEvent): void => {
      const text = e.clipboardData?.getData('text/plain')
      const { cellIds, columnIds: selectedColumnIds, rowIds: selectedRowIds } = selection
      const thisSelected = cellIds?.length ?? selectedRowIds?.length ?? selectedColumnIds?.length
      if (text && thisSelected) {
        const pasteMatrix = parsePasteTable(text)
        devLog('paste to spreadsheet', [text])
        devLog('parsed', pasteMatrix)
        pasteToSpreadsheet(pasteMatrix, selection)
        e.preventDefault()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    if (editable) {
      document.addEventListener('paste', onPaste)
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('paste', onPaste)
    }
  }, [editable, selection, rowIds, columnIds, parentId, getSelectedIdx, copyToClipboard, pasteToSpreadsheet])

  return {
    hoverRowId,
    setHoverRowId,
    selection,
    setSelection,
    clearSelection,
    selectRows,
    selectColumns,
    selectCell,
    editingCellId,
    setEditingCellId,
    dragging,
    setDragging,
    copyToClipboard,
    editable: editable === true
  }
}
