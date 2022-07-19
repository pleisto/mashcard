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
import { useEditorContext, useDocumentContext } from '../../../hooks'
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
  const { docId } = useDocumentContext()
  const rootId = docId!
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
      username: formulaContext?.username
    })
  }, [formulaContext?.username, rootId, spreadsheetId, title])

  React.useEffect(() => {
    // TODO: remove this when switch pages
    void dispatchFormulaSpreadsheetRowChange({
      spreadsheetId,
      namespaceId: rootId,
      rows: rowData,
      username: formulaContext?.username
    })
  }, [rootId, spreadsheetId, rowData, formulaContext?.username])

  React.useEffect(() => {
    void dispatchFormulaSpreadsheetColumnChange({
      spreadsheetId,
      namespaceId: rootId,
      columns: columnData,
      username: formulaContext?.username
    })
  }, [rootId, spreadsheetId, columnData, formulaContext?.username])

  React.useEffect(() => {
    if (!formulaContext) return

    if (formulaContext.findSpreadsheet({ type: 'id', namespaceId: rootId, value: spreadsheetId })) return

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
          variableId: cellBlock.data.formulaId,
          value: cellBlock.text
        }
      }
    })

    void formulaContext.setSpreadsheet(spreadsheet)
  }, [rootId, spreadsheetId, formulaContext, getCellBlock])

  return {
    deleteSpreadsheet: () => {
      void dispatchFormulaSpreadsheetRemove({ id: spreadsheetId, username: formulaContext?.username })
    }
  }
}
