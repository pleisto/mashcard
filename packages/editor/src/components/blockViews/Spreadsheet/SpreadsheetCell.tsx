import React from 'react'

import {
  MashcardEventBus,
  BlockInput,
  SpreadsheetUpdateCellValue,
  FormulaEditorBlurTrigger,
  FormulaEditorSavedTrigger
} from '@mashcard/schema'
import { FormulaBlockRender, getFormulaContext, useFormula, UseFormulaInput } from '../FormulaView'
import {
  columnDisplayIndex,
  displayValue,
  dumpDisplayResultForDisplay,
  fetchResult,
  SpreadsheetReloadViaId,
  VariableDisplayData,
  VariableInterface
} from '@mashcard/formula'
import { SpreadsheetContext } from './SpreadsheetContext'
import { devLog } from '@mashcard/design-system'
import { FormulaDisplay } from '../../ui/Formula'
import { useEditorContext, useDocumentContext } from '../../../hooks'

export interface SpreadsheetCellProps {
  context: SpreadsheetContext
  block: BlockInput
  rowIdx: number
  columnSort: number
  columnTitle: string | undefined
  tableId: string
  saveBlock: (block: BlockInput) => void
  width?: number
  height?: number
}

export const SpreadsheetCell: React.FC<SpreadsheetCellProps> = ({
  context,
  tableId,
  block,
  rowIdx,
  columnSort,
  columnTitle,
  saveBlock,
  width,
  height
}) => {
  const { editor } = useEditorContext()
  const { docId } = useDocumentContext()
  const rootId = docId!
  const formulaContext = getFormulaContext(editor)
  const minHeight = height ? height - 3 : undefined

  const [currentBlock, setCurrentBlock] = React.useState(block)
  const rowId = block.parentId as string
  const columnId = block.data.columnId

  const cellId = `${rowId},${columnId}`
  const formulaId = currentBlock.data.formulaId
  const formulaName = `Cell_${rowId}_${columnId}`.replaceAll('-', '')

  const editing = context?.editingCellId === formulaName
  const [editingCell, setEditingCell] = React.useState(editing)
  const latestEditing = React.useRef<boolean>(editing)
  const { setEditingCellId } = context
  const setEditing = React.useCallback(
    (newEditing: boolean) => {
      if (newEditing) {
        setEditingCellId(formulaName)
      } else if (editing) {
        setEditingCellId('')
      }
      setEditingCell(newEditing)
    },
    [setEditingCellId, formulaName, editing]
  )

  const onUpdateFormula = React.useCallback(
    async (variable: VariableInterface | undefined): Promise<void> => {
      if (!variable) return
      // TODO check no persist
      const value = displayValue(fetchResult(variable.t), rootId, true)
      const oldValue = block.text
      if (value === oldValue) return
      devLog('Spreadsheet cell formula updated', { cellId, value, rootId })
      const newBlock = { ...block, text: value }
      setCurrentBlock(newBlock)
      saveBlock(newBlock)

      if (!formulaContext || !rootId) return

      const result = MashcardEventBus.dispatch(
        SpreadsheetReloadViaId({
          id: tableId,
          scope: {
            rows: [String(rowIdx + 1), rowId],
            columns: [block.data.columnId, columnDisplayIndex(columnSort), ...(columnTitle ? [columnTitle] : [])]
          },
          meta: null,
          namespaceId: rootId,
          username: formulaContext.domain,
          key: variable?.currentUUID ?? tableId
        })
      )
      await Promise.all(result)
      // console.log('dispatch update cell', variable)
      // setEditing(false)
    },
    [rootId, block, cellId, saveBlock, tableId, rowIdx, rowId, columnSort, columnTitle, formulaContext]
  )

  const meta: UseFormulaInput['meta'] = {
    namespaceId: rootId,
    variableId: formulaId,
    name: formulaName,
    richType: {
      type: 'spreadsheet',
      meta: {
        spreadsheetId: tableId,
        columnId,
        rowId
      }
    }
  }

  const { temporaryVariableT, savedVariableT, formulaEditor, onSaveFormula, commitFormula, completion } = useFormula({
    meta,
    onUpdateFormula,
    formulaContext
  })

  const eventId = `${tableId},${cellId}`

  React.useEffect(() => {
    const listener = MashcardEventBus.subscribe(
      SpreadsheetUpdateCellValue,
      e => {
        const { value } = e.payload
        devLog('Spreadsheet update cell', { eventId, value })
        void commitFormula(value)
      },
      { eventId, subscribeId: eventId }
    )
    return () => listener.unsubscribe()
  }, [commitFormula, eventId])

  const handleEnterEdit = (): void => {
    context.clearSelection()
    setEditing(true)
  }

  React.useEffect(() => {
    const listener = MashcardEventBus.subscribe(
      FormulaEditorSavedTrigger,
      e => {
        setEditing(false)
      },
      { eventId: `${rootId},${formulaId}`, subscribeId: `FormulaCell#${rootId},${formulaId}` }
    )
    return () => listener.unsubscribe()
  }, [formulaId, rootId, setEditing])

  React.useEffect(() => {
    const listener = MashcardEventBus.subscribe(
      FormulaEditorBlurTrigger,
      async e => {
        await onSaveFormula()
        setEditing(false)
      },
      { eventId: `${rootId},${formulaId}`, subscribeId: `FormulaCell#${rootId},${formulaId}` }
    )
    return () => listener.unsubscribe()
  }, [formulaId, onSaveFormula, rootId, setEditing])

  if (editingCell || editing) {
    if (!latestEditing.current && formulaEditor) {
      formulaEditor.commands.focus('end')
      latestEditing.current = true
    }

    return (
      <FormulaBlockRender
        formulaEditor={formulaEditor}
        meta={meta}
        temporaryVariableT={temporaryVariableT}
        completion={completion}
        width={width}
        minHeight={minHeight}
      />
    )
  } else {
    latestEditing.current = false
  }

  const display = savedVariableT ? displayValue(fetchResult(savedVariableT), rootId) : currentBlock.text
  const fallbackDisplayData: VariableDisplayData | undefined = display
    ? {
        definition: display,
        display,
        version: 0,
        meta: { ...meta, input: display, position: display.length },
        result: { type: 'literal', result: display }
      }
    : undefined
  const displayData: VariableDisplayData | undefined = savedVariableT
    ? dumpDisplayResultForDisplay(savedVariableT)
    : currentBlock.data.displayData ?? fallbackDisplayData

  return (
    <div className="cell" style={{ ...(width ? { width: `${width}px` } : {}) }} onDoubleClick={handleEnterEdit}>
      <FormulaDisplay display={display} displayData={displayData} formulaType="spreadsheet" />
    </div>
  )
}
