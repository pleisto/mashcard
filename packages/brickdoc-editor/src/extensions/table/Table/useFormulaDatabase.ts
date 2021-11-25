import React from 'react'
import { Column } from 'react-table'
import { DatabaseRows, TableBlockOptions } from '..'

export function useFormulaDatabase(
  blockId: string,
  tableColumns: Column[],
  tableData: DatabaseRows,
  getFormulaContext: TableBlockOptions['formulaContextActions']['getFormulaContext']
): void {
  // TODO pass column Type
  React.useEffect(() => {
    const formulaContext = getFormulaContext()
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
      const formulaContext = getFormulaContext()
      formulaContext?.removeDatabase(blockId)
    }
  }, [blockId, getFormulaContext, tableColumns, tableData])
}
