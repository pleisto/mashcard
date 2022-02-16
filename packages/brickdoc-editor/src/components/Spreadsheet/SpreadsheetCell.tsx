import React from 'react'

import { BrickdocEventBus, Event, BlockInput, SpreadsheetUpdateCellValue } from '@brickdoc/schema'
import { FormulaBlockRender } from '../Formula/FormulaBlockRender'
import { displayValue, VariableInterface } from '@brickdoc/formula'
import { SpreadsheetContext } from './SpreadsheetContext'
import { FormulaRender } from '../Formula/FormulaRender'
import { devLog } from '@brickdoc/design-system'
import { EditorDataSourceContext } from '../../dataSource/DataSource'

export interface SpreadsheetCellProps {
  context: SpreadsheetContext
  block: BlockInput
  rootId: string
  saveBlock: (block: BlockInput) => void
}

export const SpreadsheetCell: React.FC<SpreadsheetCellProps> = ({ context, rootId, block, saveBlock }) => {
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const formulaContext = editorDataSource.formulaContext

  const [currentBlock, setCurrentBlock] = React.useState(block)

  const cellId = `${currentBlock.parentId},${currentBlock.data.columnId}`
  const formulaId = currentBlock.data.formulaId
  const formulaName = `${currentBlock.parentId}_${currentBlock.data.columnId}`

  const variable = formulaContext?.findVariable(rootId, formulaId)

  const editing = context?.editingCellId === formulaName
  const { setEditingCellId } = context
  const setEditing = React.useCallback(
    (editing: boolean) => setEditingCellId(editing ? formulaName : ''),
    [setEditingCellId, formulaName]
  )

  const updateFormula = React.useCallback(
    (variable: VariableInterface | undefined): void => {
      if (variable) {
        const value = displayValue(variable.t.variableValue.result)
        devLog('Spreadsheet cell formula updated', { cellId, value })
        const newBlock = {
          ...block,
          data: { ...block.data, t: variable.result() },
          text: value
        }
        setCurrentBlock(newBlock)
        saveBlock(newBlock)
      }
      // devLog('updateFormula', { variable, block, newBlock, parentId, formulaId })
      setEditing(false)
    },
    [block, saveBlock, cellId, setEditing]
  )

  const eventId = `${rootId},${cellId}`

  const updateCellValue = async (value: string) => {
    if (variable) {
      await variable.updateDefinition(value)
      updateFormula(variable)
    }
  }

  BrickdocEventBus.subscribe(
    SpreadsheetUpdateCellValue,
    (e: Event) => {
      const { value } = e.payload
      devLog('Spreadsheet update cell', { eventId, value })
      void updateCellValue(value)
    },
    { eventId, subscribeId: eventId }
  )

  const handleEnterEdit = (): void => {
    context.clearSelection()
    setEditing(true)
  }

  if (editing) {
    return (
      <FormulaBlockRender
        saveOnBlur={true}
        formulaName={formulaName}
        rootId={rootId}
        formulaId={formulaId}
        updateFormula={updateFormula}
        formulaType="spreadsheet"
      />
    )
  }

  return (
    <div className="cell" onDoubleClick={handleEnterEdit}>
      <FormulaRender t={currentBlock.data.t} formulaType="spreadsheet" />
    </div>
  )
}
