import React from 'react'
import { SpreadsheetType, SpreadsheetClass, ColumnInitializer, Row, CellType } from '@brickdoc/formula'
import { BlockInput } from '@brickdoc/schema'
import { SpreadsheetColumn } from './useSpreadsheet'
import { columnDisplayTitle } from './helper'
import { useExternalProps } from '../../../hooks/useExternalProps'

interface useFormulaSpreadsheetProps {
  blockId: string
  columns: SpreadsheetColumn[]
  rows: BlockInput[]
  getCellBlock: (rowId: string, columnId: string) => BlockInput
  title: string
}

export function useFormulaSpreadsheet({
  blockId,
  columns,
  rows,
  title,
  getCellBlock
}: useFormulaSpreadsheetProps): void {
  const externalProps = useExternalProps()
  const formulaContext = externalProps.formulaContext

  React.useEffect(() => {
    if (!formulaContext) return
    const spreadsheetName = title || 'Untitled Spreadsheet'
    const columnData: ColumnInitializer[] = columns.map((column, index) => ({
      columnId: column.uuid,
      namespaceId: blockId,
      name: columnDisplayTitle(column),
      // index: column.sort
      index
    }))

    const rowData: Row[] = rows.map((row, rowIndex) => ({ rowId: row.id, rowIndex }))

    const spreadsheet: SpreadsheetType = new SpreadsheetClass({
      ctx: { formulaContext },
      blockId,
      dynamic: false,
      name: spreadsheetName,
      listColumns: () => columnData,
      listRows: () => rowData,
      listCells: ({ rowId, columnId }) => {
        const rowIdsWithIndex = rows.map((row, index) => ({ rowId: row.id, rowIndex: index }))
        const columnIdsWithIndex = columns.map((column, index) => ({ columnId: column.uuid, columnIndex: index }))

        const finalRowIdsWithIndex = rowId ? rowIdsWithIndex.filter(row => row.rowId === rowId) : rowIdsWithIndex
        const finalColumnIdsWithIndex = columnId
          ? columnIdsWithIndex.filter(column => column.columnId === columnId)
          : columnIdsWithIndex

        return finalRowIdsWithIndex.flatMap(({ rowId, rowIndex }) =>
          finalColumnIdsWithIndex.map(({ columnId, columnIndex }) => {
            const cellBlock = getCellBlock(rowId, columnId)
            const cell: CellType = {
              spreadsheetId: blockId,
              columnId,
              rowIndex,
              columnIndex,
              rowId,
              cellId: cellBlock.id,
              value: cellBlock.text,
              displayData: cellBlock.data.displayData
            }
            return cell
          })
        )
      }
    })

    formulaContext.setSpreadsheet(spreadsheet)
    return () => {
      formulaContext.removeSpreadsheet(blockId)
    }
  }, [blockId, title, columns, rows, formulaContext, getCellBlock])
}
