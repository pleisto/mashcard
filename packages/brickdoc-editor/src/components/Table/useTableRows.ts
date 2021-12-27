import { DatabaseRows } from '../../extensions/table'
import { EditorDataSource, useDatabaseRowsReturn } from '../../dataSource/DataSource'
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
  updateRows: useDatabaseRowsReturn['updateRows']
  fetchRows: useDatabaseRowsReturn['fetchRows']
  removeRow: useDatabaseRowsReturn['removeRow']
}

export function useTableRows({
  editorDataSource,
  parentId,
  updateActiveStatus
}: UseTableRowsProps): [DatabaseRows, TableRowsUtils] {
  const {
    rows: tableRows,
    fetchRows,
    addRow,
    updateRows,
    removeRow,
    moveRow
  } = editorDataSource.useDatabaseRows({ updateBlocks: editorDataSource.updateBlocks })

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
