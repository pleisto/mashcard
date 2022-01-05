import React from 'react'
import { Column } from 'react-table'
import { ContextInterface, SpreadsheetType, SpreadsheetClass, ColumnInitializer } from '@brickdoc/formula'
import { BlockSpreadsheetLoaded, BrickdocEventBus } from '@brickdoc/schema'
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

    if (!formulaContext) {
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

    const database: SpreadsheetType = new SpreadsheetClass({
      ctx: { formulaContext },
      blockId,
      dynamic: false,
      name: spreadsheetName,
      listColumns: () => columns,
      listRows: () => tableData
    })

    formulaContext.setSpreadsheet(blockId, database)

    if (formulaContext) {
      BrickdocEventBus.dispatch(BlockSpreadsheetLoaded({ id: blockId }))
    }

    return () => {
      formulaContext.removeSpreadsheet(blockId)
    }
  }, [blockId, title, formulaContext, tableColumns, tableData, dynamic])
}
