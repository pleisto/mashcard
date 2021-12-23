import React from 'react'
import { DatabaseRows } from '../../extensions/table'
import { EditorDataSource } from '../../dataSource/DataSource'
import { ActiveStatusUpdater } from './useActiveStatus'

export interface UseTableRowsProps {
  parentId: string
  editorDataSource: EditorDataSource
  updateActiveStatus: ActiveStatusUpdater
}

export interface TableRowsUtils {
  updateData: (rowId: string, key: string, data: any) => void
  batchDeleteDataByValue: (columnId: string, value: string) => void
  batchUpdateDataByColumn: (columnId: string, value: any) => void
  addNewRow: (rowIndex?: number) => void
  moveRow: (fromIndex: number, toIndex: number) => void
  updateRows: EditorDataSource['table']['updateRows']
  fetchRows: EditorDataSource['table']['fetchRows']
  removeRow: EditorDataSource['table']['removeRow']
}

export function useTableRows({
  editorDataSource,
  parentId,
  updateActiveStatus
}: UseTableRowsProps): [DatabaseRows, TableRowsUtils] {
  const { rows: databaseRows, fetchRows, addRow, updateRows, removeRow, moveRow } = editorDataSource.table
  const [tableRows, setTableRows] = React.useState(databaseRows)

  React.useEffect(() => {
    return editorDataSource.onUpdate(type => {
      if (type === 'table') {
        setTableRows(editorDataSource.table.rows)
      }
    })
  }, [editorDataSource])

  const updateData = (rowId: string, key: string, data: any): void => {
    const row = tableRows.find(r => r.id === rowId)
    if (row) {
      void updateRows(parentId, [{ ...row, [key]: data }])
    }
  }

  const batchDeleteDataByValue = (columnId: string, value: string): void => {
    void updateRows(
      parentId,
      tableRows.map(r => (r[columnId] === value ? { ...r, [columnId]: null } : r))
    )
  }

  const batchUpdateDataByColumn = (columnId: string, value: any): void => {
    void updateRows(
      parentId,
      tableRows.map(r => ({ ...r, [columnId]: value }))
    )
  }

  const addNewRow = (rowIndex?: number): void => {
    const row = addRow(parentId, rowIndex)
    updateActiveStatus([{ rowId: row.id }])
  }

  const handleMoveRow = (fromIndex: number, toIndex: number): void => {
    const row = moveRow(parentId, fromIndex, toIndex)
    if (row) updateActiveStatus([{ rowId: row.id }])
  }

  return [
    tableRows,
    {
      batchDeleteDataByValue,
      batchUpdateDataByColumn,
      addNewRow,
      updateData,
      updateRows,
      fetchRows,
      removeRow,
      moveRow: handleMoveRow
    }
  ]
}
