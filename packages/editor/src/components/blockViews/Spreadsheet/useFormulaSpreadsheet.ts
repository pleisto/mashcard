import React from 'react'
import {
  SpreadsheetType,
  SpreadsheetClass,
  Column,
  Row,
  dispatchFormulaSpreadsheetNameChange,
  dispatchFormulaSpreadsheetRemove,
  dispatchFormulaSpreadsheetRowChange,
  dispatchFormulaSpreadsheetColumnChange
} from '@mashcard/formula'
import { BlockInput } from '@mashcard/schema'
import { SpreadsheetColumn } from './useSpreadsheet'
import { columnDisplayIndex, columnDisplayTitle } from './helper'
import { useEditorContext } from '../../../hooks'
import { getFormulaContext } from '../FormulaView'

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
  const { editor } = useEditorContext()
  const rootId = editor?.state.doc.attrs.uuid
  const formulaContext = getFormulaContext(editor)
  const titleRef = React.useRef(title)

  const rowData: Row[] = React.useMemo(
    () => rows.map((row, rowIndex) => ({ rowId: row.id, rowIndex, spreadsheetId })),
    [rows, spreadsheetId]
  )
  const columnData: Column[] = React.useMemo(
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
    void dispatchFormulaSpreadsheetNameChange({
      spreadsheetId,
      title,
      namespaceId: rootId,
      username: formulaContext?.domain
    })
  }, [formulaContext?.domain, rootId, spreadsheetId, title])

  React.useEffect(() => {
    void dispatchFormulaSpreadsheetRowChange({
      spreadsheetId,
      namespaceId: rootId,
      rows: rowData,
      username: formulaContext?.domain
    })
  }, [rootId, spreadsheetId, rowData, formulaContext?.domain])

  React.useEffect(() => {
    void dispatchFormulaSpreadsheetColumnChange({
      spreadsheetId,
      namespaceId: rootId,
      columns: columnData,
      username: formulaContext?.domain
    })
  }, [rootId, spreadsheetId, columnData, formulaContext?.domain])

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

    void formulaContext.setSpreadsheet(spreadsheet)
    return () => {
      // formulaContext.removeSpreadsheet(spreadsheetId)
    }
  }, [rootId, spreadsheetId, formulaContext, getCellBlock])

  return {
    deleteSpreadsheet: () => {
      void dispatchFormulaSpreadsheetRemove({ id: spreadsheetId, username: formulaContext?.domain })
    }
  }
}
