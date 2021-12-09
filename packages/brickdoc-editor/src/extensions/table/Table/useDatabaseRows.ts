import React from 'react'
import { v4 as uuid } from 'uuid'
import { TableExtensionOptions, DatabaseRow, DatabaseRows } from '../../table'

export const useDatabaseRows: TableExtensionOptions['useDatabaseRows'] = (parentId: string) => {
  const [databaseRows, setDatabaseRows] = React.useState([] as DatabaseRows)

  const fetchRows = React.useCallback(async (): Promise<void> => {}, [])

  const addRow = React.useCallback(
    (rowIndex?: number): DatabaseRow => {
      const currentRowIndex = rowIndex ?? databaseRows.length - 1
      const id = uuid()
      const row = { id, sort: currentRowIndex }
      setDatabaseRows([...databaseRows.slice(0, currentRowIndex + 1), row, ...databaseRows.slice(currentRowIndex + 1, databaseRows.length)])
      return row
    },
    [databaseRows]
  )

  const updateRows = React.useCallback(
    (rows: DatabaseRows): void => {
      const rowsMap = new Map(rows.map(row => [row.id, row]))
      const prevRowsMap = new Map(databaseRows.map(row => [row.id, row]))
      const newRows = [
        ...databaseRows.map(prevRow => rowsMap.get(prevRow.id) ?? prevRow),
        ...rows.filter(row => !prevRowsMap.has(row.id))
      ].sort((a, b) => b.sort - a.sort)
      setDatabaseRows(newRows)
    },
    [databaseRows]
  )

  const removeRow = React.useCallback(
    (rowId: string): void => {
      setDatabaseRows(databaseRows.filter(row => row.id !== rowId))
    },
    [databaseRows]
  )

  const moveRow = React.useCallback(
    (fromIndex: number, toIndex: number): DatabaseRow | undefined => {
      let targetRow: DatabaseRow | undefined
      const newRows = databaseRows.filter((row, index) => {
        if (index !== fromIndex) {
          return true
        } else {
          targetRow = row
          return false
        }
      })
      if (!targetRow) return

      setDatabaseRows([...newRows.slice(0, toIndex), targetRow, ...newRows.slice(toIndex, newRows.length)])

      return targetRow
    },
    [databaseRows]
  )

  return [
    databaseRows,
    {
      fetchRows,
      addRow,
      updateRows,
      removeRow,
      moveRow
    }
  ]
}
