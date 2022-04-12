import React from 'react'
import {
  SpreadsheetType,
  SpreadsheetClass,
  ColumnInitializer,
  Row,
  SpreadsheetUpdateNameViaId,
  SpreadsheetUpdateRowsViaId,
  SpreadsheetUpdateColumnsViaId
} from '@brickdoc/formula'
import { BlockInput, BrickdocEventBus } from '@brickdoc/schema'
import { SpreadsheetColumn } from './useSpreadsheet'
import { columnDisplayIndex, columnDisplayTitle } from './helper'
import { useExternalProps } from '../../../hooks/useExternalProps'

interface useFormulaSpreadsheetProps {
  spreadsheetId: string
  columns: SpreadsheetColumn[]
  rows: BlockInput[]
  getCellBlock: (rowId: string, columnId: string) => BlockInput
  title: string
}

export function useFormulaSpreadsheet({
  spreadsheetId,
  columns,
  rows,
  title: originalTitle,
  getCellBlock
}: useFormulaSpreadsheetProps): {
  deleteSpreadsheet: () => void
} {
  const title = originalTitle || 'Untitled Spreadsheet'
  const externalProps = useExternalProps()
  const formulaContext = externalProps.formulaContext
  const rootId = externalProps.rootId
  const titleRef = React.useRef(title)

  const rowData: Row[] = React.useMemo(
    () => rows.map((row, rowIndex) => ({ rowId: row.id, rowIndex, spreadsheetId })),
    [rows, spreadsheetId]
  )
  const columnData: ColumnInitializer[] = React.useMemo(
    () =>
      columns.map(({ uuid: columnId, sort, title }, index) => ({
        columnId,
        spreadsheetId,
        sort,
        title,
        displayIndex: columnDisplayIndex(sort),
        name: columnDisplayTitle({ uuid: columnId, sort, title }),
        index
      })),
    [columns, spreadsheetId]
  )

  const rowsRef = React.useRef(rowData)
  const columnsRef = React.useRef(columnData)

  React.useEffect(() => {
    BrickdocEventBus.dispatch(
      SpreadsheetUpdateNameViaId({
        spreadsheetId,
        name: title,
        key: spreadsheetId,
        namespaceId: rootId
      })
    )
  }, [rootId, spreadsheetId, title])

  React.useEffect(() => {
    BrickdocEventBus.dispatch(
      SpreadsheetUpdateRowsViaId({
        spreadsheetId,
        rows: rowData,
        key: spreadsheetId,
        namespaceId: rootId
      })
    )
  }, [rootId, spreadsheetId, rowData])

  React.useEffect(() => {
    BrickdocEventBus.dispatch(
      SpreadsheetUpdateColumnsViaId({
        spreadsheetId,
        columns: columnData,
        key: spreadsheetId,
        namespaceId: rootId
      })
    )
  }, [rootId, spreadsheetId, columnData])

  React.useEffect(() => {
    if (!formulaContext) return

    const spreadsheet: SpreadsheetType = new SpreadsheetClass({
      ctx: { formulaContext },
      namespaceId: rootId,
      spreadsheetId,
      dynamic: false,
      name: titleRef.current,
      columns: columnsRef.current,
      rows: rowsRef.current,
      getCell: ({ rowId, columnId, rowIndex, columnIndex }) => {
        const cellBlock = getCellBlock(rowId, columnId)

        return {
          namespaceId: rootId,
          spreadsheetId,
          columnId,
          rowIndex,
          columnIndex,
          rowId,
          cellId: cellBlock.id,
          value: cellBlock.text,
          displayData: cellBlock.data.displayData
        }
      }
    })

    formulaContext.setSpreadsheet(spreadsheet)
    return () => {
      // formulaContext.removeSpreadsheet(spreadsheetId)
    }
  }, [rootId, spreadsheetId, formulaContext, getCellBlock])

  return {
    deleteSpreadsheet: () => {
      formulaContext?.removeSpreadsheet(spreadsheetId)
    }
  }
}
