import React from 'react'

import {
  BrickdocEventBus,
  Event,
  BlockInput,
  SpreadsheetUpdateCellValue,
  BlockSpreadsheetLoaded
} from '@brickdoc/schema'
import { FormulaBlockRender } from '../Formula/FormulaBlockRender'
import { displayValue, dumpDisplayResultForDisplay, fetchResult, VariableInterface } from '@brickdoc/formula'
import { SpreadsheetContext } from './SpreadsheetContext'
import { FormulaDisplay } from '../Formula/FormulaDisplay'
import { devLog } from '@brickdoc/design-system'
import { useExternalProps } from '../../../hooks/useExternalProps'
import { useFormula } from '../Formula'
import * as Sentry from '@sentry/react'

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

  const refreshCell = React.useCallback(
    (variable: VariableInterface | undefined): void => {
      if (variable) {
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
      setEditing(false)
    },
    [setEditing, rootId, cellId, block, saveBlock, tableId]
  )

  const updateFormula = React.useCallback(
    (variable): void => {
      refreshCell(variable)
    },
    [refreshCell]
  )

  const { variableT, editorContent, commitFormula, completion, updateEditor } = useFormula({
    rootId,
    formulaId,
    updateFormula,
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

  const displayData = variableT ? dumpDisplayResultForDisplay(variableT) : currentBlock.data.displayData
  const display = variableT ? displayValue(fetchResult(variableT), rootId) : currentBlock.text

  return (
    <div className="cell" style={{ ...(width ? { width: `${width}px` } : {}) }} onDoubleClick={handleEnterEdit}>
      <FormulaDisplay display={display} displayData={displayData} formulaType="spreadsheet" />
    </div>
  )
}
