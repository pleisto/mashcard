import React from 'react'

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
}

export const useSpreadsheetContext = (): SpreadsheetContext => {
  const [selection, setSelection] = React.useState<SpreadsheetSelection>({})
  const [dragging, setDragging] = React.useState<SpreadsheetDragging>({})

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

  return {
    selection,
    setSelection,
    clearSelection,
    selectRows,
    selectColumns,
    selectCell,
    dragging,
    setDragging
  }
}
