import React from 'react'
import { devLog } from '@brickdoc/design-system'

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
  selection: SpreadsheetSelection
  setSelection: (selection: SpreadsheetSelection) => void
  clearSelection: () => void
  selectRows: (rowIds: string[]) => void
  selectColumns: (columnIds: string[]) => void
  selectCell: (cellId: string) => void
  dragging: SpreadsheetDragging
  setDragging: (dragging: SpreadsheetDragging) => void
  copyToClipboard: (curSelections?: { columnIds?: string[]; rowIds?: string[]; cellIds?: string[] }) => void
}

export const keyDownMovements: { [key: string]: [number, number] } = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1]
}

export const useSpreadsheetContext = (options: {
  columnIds: string[]
  rowIds: string[]
  columnHeaders: Map<string, string>
  valuesMatrix: Map<string, Map<string, string>>
}): SpreadsheetContext => {
  const [selection, setSelection] = React.useState<SpreadsheetSelection>({})
  const [dragging, setDragging] = React.useState<SpreadsheetDragging>({})

  const { columnIds, rowIds, columnHeaders, valuesMatrix } = options ?? {}

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
          .map(rowId => Array.from(valuesMatrix.get(rowId)?.values() ?? []).join('\t'))
          .join('\n')
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
    [selection, columnHeaders, valuesMatrix]
  )

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      devLog(`key down ${e.code}`)
      const { cellIds, columnIds: selectedColumnIds, rowIds: selectedRowIds } = selection
      const thisSelected = cellIds?.length ?? selectedRowIds?.length ?? selectedColumnIds?.length
      if (thisSelected && columnIds && rowIds) {
        const movement = keyDownMovements[e.code]
        if (movement) {
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
          let nRowIdx = rowIdx + movement[0]
          let nColumnIdx = columnIdx + movement[1]
          if (nRowIdx > rowIds.length) nRowIdx = 0
          if (nRowIdx < 0) nRowIdx = rowIds.length
          if (nColumnIdx > columnIds.length) nColumnIdx = 0
          if (nColumnIdx < 0) nColumnIdx = columnIds.length
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
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [selection, rowIds, columnIds, copyToClipboard])

  return {
    selection,
    setSelection,
    clearSelection,
    selectRows,
    selectColumns,
    selectCell,
    dragging,
    setDragging,
    copyToClipboard
  }
}
