import { FormulaContext } from '@brickdoc/formula'
import React from 'react'
import { Column } from 'react-table'
import { DatabaseRows } from '..'

export function useFormulaDatabase(
  blockId: string,
  tableColumns: Column[],
  tableData: DatabaseRows,
  formulaContext: FormulaContext | null | undefined
): void {
  // TODO pass column Type
  React.useEffect(() => {
    const columns = tableColumns.map(column => ({
      namespaceId: blockId,
      columnId: column.accessor as string,
      name: column.Header as string,
      type: (column as any).columnType,
      index: (column as any).index
    }))
    formulaContext?.setDatabase(blockId, {
      name: () => 'untitled',
      size: () => tableData.length,
      _data: () => ({
        tableData,
        columns,
        tableColumns
      }),
      listColumns: () => columns,
      getCell: (columnId, rowId) => {
        const value = tableData.find(row => row.id === rowId)?.[columnId]

        if (value) {
          return { value }
        }

        return undefined
      },
      listCell: columnId =>
        tableData.map(row => ({
          value: row[columnId]
        })),
      getColumn: columnId => columns.find(col => col.columnId === columnId)
    })

    return () => {
      formulaContext?.removeDatabase(blockId)
    }
  }, [blockId, formulaContext, tableColumns, tableData])
}
