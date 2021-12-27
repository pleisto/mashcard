import React from 'react'
import { Column } from 'react-table'
import { ContextInterface, DatabaseType, DatabaseClass, ColumnInitializer } from '@brickdoc/formula'
import { BlockTableLoaded, BrickdocEventBus } from '@brickdoc/schema'
import { DatabaseRows } from '../../extensions/table'

// eslint-disable-next-line max-params
export function useFormulaDatabase(
  blockId: string,
  title: string,
  tableColumns: Column[],
  tableData: DatabaseRows,
  formulaContext: ContextInterface | null | undefined,
  dynamic: boolean
): void {
  // TODO pass column Type
  React.useEffect(() => {
    if (dynamic) {
      return
    }
    const spreadsheetName = title ?? 'Untitled'
    const columns: ColumnInitializer[] = tableColumns.map(column => ({
      columnId: column.accessor as string,
      namespaceId: blockId,
      name: column.Header as string,
      type: (column as any).columnType,
      index: (column as any).index,
      rows: tableData.map(row => row[column.accessor as string])
    }))

    const database: DatabaseType = new DatabaseClass({
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
  }, [blockId, title, formulaContext, tableColumns, tableData, dynamic])
}
