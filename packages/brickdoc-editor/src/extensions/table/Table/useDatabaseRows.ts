import React from 'react'
import { v4 as uuid } from 'uuid'
import { TableExtensionOptions, DatabaseRow, DatabaseRows } from '../../table'

export const useDatabaseRows: TableExtensionOptions['useDatabaseRows'] = (parentId: string) => {
  const [databaseRows, setDatabaseRows] = React.useState([] as DatabaseRows)

  const fetchRows = async (): Promise<void> => {}

  const addRow = (rowIndex?: number): DatabaseRow => {
    const currentRowIndex = rowIndex ?? databaseRows.length - 1
    const id = uuid()
    const row = { id, sort: currentRowIndex }
    setDatabaseRows([...databaseRows.slice(0, currentRowIndex + 1), row, ...databaseRows.slice(currentRowIndex + 1, databaseRows.length)])
    return row
  }

  const updateRow = (row: DatabaseRow, updateState = true): void => {
    const newRows = databaseRows.map((prevRow: DatabaseRow) => {
      return prevRow.id === row.id ? row : prevRow
    })
    setDatabaseRows(newRows)
  }

  const removeRow = (rowId: string): void => {
    setDatabaseRows(databaseRows.filter(row => row.id !== rowId))
  }

  const setRowsState = React.useCallback((rows: DatabaseRows): void => setDatabaseRows(rows), [setDatabaseRows])

  return [
    databaseRows,
    {
      fetchRows,
      addRow,
      updateRow,
      removeRow,
      setRowsState
    }
  ]
}
