import { ContextInterface, Database, Column as ColumnType } from '@brickdoc/formula'
import React from 'react'
import { Column } from 'react-table'
import { DatabaseRows } from '..'

// eslint-disable-next-line max-params
export function useFormulaDatabase(
  blockId: string,
  title: string,
  tableColumns: Column[],
  tableData: DatabaseRows,
  formulaContext: ContextInterface | null | undefined
): void {
  // TODO pass column Type
  React.useEffect(() => {
    const spreadsheetName = title ?? 'Untitled'
    const columns: ColumnType[] = tableColumns.map(column => ({
      namespaceId: blockId,
      columnId: column.accessor as string,
      name: column.Header as string,
      spreadsheetName,
      type: (column as any).columnType,
      index: (column as any).index
    }))

    const database: Database = {
      blockId,
      name: () => spreadsheetName,
      columnCount: () => columns.length,
      rowCount: () => tableData.length,
      _data: () => ({
        tableData,
        columns,
        tableColumns
      }),
      listColumns: () => columns,
      listRows: () => tableData,
      getColumn: columnId => columns.find(col => col.columnId === columnId),
      getRow: rowId => tableData.find(row => row.rowId === rowId)
    }

    formulaContext?.setDatabase(blockId, database)

    return () => {
      formulaContext?.removeDatabase(blockId)
    }
  }, [blockId, title, formulaContext, tableColumns, tableData])
}
