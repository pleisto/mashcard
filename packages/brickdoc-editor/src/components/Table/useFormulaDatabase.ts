import React from 'react'
import { Column } from 'react-table'
import { ContextInterface, Database, Column as ColumnType, DatabaseFactory } from '@brickdoc/formula'
import { BlockTableLoaded, BrickdocEventBus } from '@brickdoc/schema'
import { DatabaseRows } from '../../extensions/table'

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
      index: (column as any).index,
      rows: tableData.map(row => row[column.accessor as string])
    }))

    const database: Database = new DatabaseFactory({
      blockId,
      dynamic: false,
      name: () => spreadsheetName,
      listColumns: () => columns,
      listRows: () => tableData
    })

    formulaContext?.setDatabase(blockId, database)

    if (formulaContext) {
      BrickdocEventBus.dispatch(BlockTableLoaded({ id: blockId }))
    }

    return () => {
      formulaContext?.removeDatabase(blockId)
    }
  }, [blockId, title, formulaContext, tableColumns, tableData])
}
