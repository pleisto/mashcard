import React from 'react'

import {
  BrickdocEventBus,
  Event,
  BlockInput,
  SpreadsheetUpdateCellValue,
  BlockSpreadsheetLoaded,
  FormulaEditorSavedTrigger
} from '@brickdoc/schema'
import { FormulaBlockRender, useFormula } from '../FormulaView'
import {
  displayValue,
  dumpDisplayResultForDisplay,
  fetchResult,
  VariableDisplayData,
  VariableInterface
} from '@brickdoc/formula'
import { SpreadsheetContext } from './SpreadsheetContext'
import { devLog } from '@brickdoc/design-system'
import { useExternalProps } from '../../../hooks/useExternalProps'
import * as Sentry from '@sentry/react'
import { FormulaDisplay } from '../../ui/Formula'

export interface SpreadsheetCellProps {
  context: SpreadsheetContext
  block: BlockInput
  tableId: string
  saveBlock: (block: BlockInput) => void
  width?: number
  height?: number
}

export const SpreadsheetCell: React.FC<SpreadsheetCellProps> = ({
  context,
  tableId,
  block,
  saveBlock,
  width,
  height
}) => {
  const externalProps = useExternalProps()
  const formulaContext = externalProps.formulaContext
  const rootId = externalProps.rootId
  const minHeight = height ? height - 4 : undefined

  const [currentBlock, setCurrentBlock] = React.useState(block)

  const cellId = `${currentBlock.parentId},${currentBlock.data.columnId}`
  const formulaId = currentBlock.data.formulaId
  const formulaName = `Cell_${currentBlock.parentId}_${currentBlock.data.columnId}`.replaceAll('-', '')

  const formulaType = 'spreadsheet'

  const editing = context?.editingCellId === formulaName
  const [editingCell, setEditingCell] = React.useState(editing)
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
    (variable: VariableInterface | undefined): void => {
      if (variable) {
        // TODO check no persist
        const displayData = dumpDisplayResultForDisplay(variable.t)
        const value = displayValue(fetchResult(variable.t), rootId)
        devLog('Spreadsheet cell formula updated', { cellId, value, displayData })
        const newBlock = {
          ...block,
          data: { ...block.data, displayData },
          text: value
        }
        setCurrentBlock(newBlock)
        saveBlock(newBlock)
        BrickdocEventBus.dispatch(BlockSpreadsheetLoaded({ id: tableId }))
      }
      // devLog('updateFormula', { variable, block, newBlock, parentId, formulaId })
      // setEditing(false)
    },
    [rootId, cellId, block, saveBlock, tableId]
  )

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaEditorSavedTrigger,
      e => {
        setEditing(false)
      },
      {
        eventId: `${rootId},${formulaId}`,
        subscribeId: `FormulaMenu#${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [formulaId, rootId, setEditing])

  const { variableT, editorContent, commitFormula, completion, updateEditor } = useFormula({
    rootId,
    formulaId,
    onUpdateFormula,
    formulaType,
    formulaName,
    formulaContext
  })

  const eventId = `${tableId},${cellId}`

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      SpreadsheetUpdateCellValue,
      (e: Event) => {
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

  if (!variableT && currentBlock.text) {
    Sentry.withScope(scope => {
      const error = new Error(`Variable is undefined`)
      scope.setExtra('display', currentBlock.text)
      scope.setExtra('formulaId', formulaId)
      scope.setExtra('rootId', rootId)
      scope.setExtra('formulaName', formulaName)
      error.message = `Variable is undefined`
      Sentry.captureException(error)
    })
  }

  if (editingCell || editing) {
    return (
      <FormulaBlockRender
        saveOnBlur={true}
        rootId={rootId}
        formulaId={formulaId}
        variableT={variableT}
        editorContent={editorContent}
        completion={completion}
        updateEditor={updateEditor}
        width={width}
        minHeight={minHeight}
      />
    )
  }

  const display = variableT ? displayValue(fetchResult(variableT), rootId) : currentBlock.text
  const fallbackDisplayData: VariableDisplayData | undefined = display
    ? ({
        result: { type: 'string', result: display },
        kind: 'literal',
        type: 'spreadsheet'
      } as unknown as VariableDisplayData)
    : undefined
  const displayData: VariableDisplayData | undefined = variableT
    ? dumpDisplayResultForDisplay(variableT)
    : currentBlock.data.displayData ?? fallbackDisplayData

  return (
    <div className="cell" style={{ ...(width ? { width: `${width}px` } : {}) }} onDoubleClick={handleEnterEdit}>
      <FormulaDisplay display={display} displayData={displayData} formulaType="spreadsheet" />
    </div>
  )
}
