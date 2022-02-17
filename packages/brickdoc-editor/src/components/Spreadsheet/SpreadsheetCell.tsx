import React from 'react'

import {
  BrickdocEventBus,
  Event,
  BlockInput,
  SpreadsheetUpdateCellValue,
  FormulaUpdatedViaId,
  BlockSpreadsheetLoaded
} from '@brickdoc/schema'
import { FormulaBlockRender } from '../Formula/FormulaBlockRender'
import { displayValue } from '@brickdoc/formula'
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

  const variableRef = React.useRef(formulaContext?.findVariable(rootId, formulaId))

  const editing = context?.editingCellId === formulaName
  const { setEditingCellId } = context
  const setEditing = React.useCallback(
    (editing: boolean) => setEditingCellId(editing ? formulaName : ''),
    [setEditingCellId, formulaName]
  )

  const refreshCell = React.useCallback((): void => {
    if (variableRef.current) {
      const value = displayValue(variableRef.current.t.variableValue.result)
      devLog('Spreadsheet cell formula updated', { cellId, value })
      const newBlock = {
        ...block,
        data: { ...block.data, t: variableRef.current.result() },
        text: value
      }
      setCurrentBlock(newBlock)
      saveBlock(newBlock)
      BrickdocEventBus.dispatch(BlockSpreadsheetLoaded({ id: rootId }))
    }
    // devLog('updateFormula', { variable, block, newBlock, parentId, formulaId })
    setEditing(false)
  }, [setEditing, cellId, block, saveBlock, rootId])

  const updateFormula = React.useCallback(
    (variable): void => {
      variableRef.current = variable
      refreshCell()
    },
    [refreshCell]
  )

  const eventId = `${rootId},${cellId}`

  const updateCellValue = React.useCallback(
    async (value: string) => {
      if (variableRef.current) {
        await variableRef.current.updateDefinition(value)
        refreshCell()
      }
    },
    [refreshCell]
  )

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaUpdatedViaId,
      e => {
        variableRef.current = e.payload
        refreshCell()
      },
      {
        eventId: `${rootId},${formulaId}`,
        subscribeId: `UseFormula#${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [formulaId, refreshCell, rootId])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      SpreadsheetUpdateCellValue,
      (e: Event) => {
        const { value } = e.payload
        devLog('Spreadsheet update cell', { eventId, value })
        void updateCellValue(value)
      },
      { eventId, subscribeId: eventId }
    )
    return () => listener.unsubscribe()
  }, [eventId, updateCellValue])

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
