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
import { displayValue, dumpDisplayResultForDisplay, fetchResult, VariableClass, VariableData } from '@brickdoc/formula'
import { SpreadsheetContext } from './SpreadsheetContext'
import { FormulaDisplay } from '../Formula/FormulaDisplay'
import { devLog } from '@brickdoc/design-system'
import { EditorDataSourceContext } from '../../dataSource/DataSource'

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
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const formulaContext = editorDataSource.formulaContext
  const rootId = editorDataSource.rootId

  const [currentBlock, setCurrentBlock] = React.useState(block)

  const cellId = `${currentBlock.parentId},${currentBlock.data.columnId}`
  const formulaId = currentBlock.data.formulaId
  const formulaName = `Cell_${currentBlock.parentId}_${currentBlock.data.columnId}`.replaceAll('-', '')

  const variableRef = React.useRef(formulaContext?.findVariableById(rootId, formulaId))

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

  const refreshCell = React.useCallback(async (): Promise<void> => {
    if (variableRef.current) {
      const displayData = await dumpDisplayResultForDisplay(variableRef.current.t)
      const value = displayValue(fetchResult(variableRef.current.t), rootId)
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
  }, [setEditing, rootId, cellId, block, saveBlock, tableId])

  const updateFormula = React.useCallback(
    (variable): void => {
      variableRef.current = variable
      void refreshCell()
    },
    [refreshCell]
  )

  const updateCellValue = React.useCallback(
    async (value: string) => {
      if (!variableRef.current && formulaContext) {
        const variableT = {
          namespaceId: rootId,
          definition: value,
          variableId: formulaId,
          name: formulaName,
          version: 0,
          type: 'spreadsheet',
          variableValue: {
            success: true,
            result: { type: 'string', result: value },
            cacheValue: { type: 'string', result: value },
            updatedAt: new Date()
          }
        } as unknown as VariableData
        // TODO refactor this
        variableRef.current = new VariableClass({
          t: variableT,
          formulaContext
        })
        await variableRef.current.reinterpret()
        await variableRef.current.save()
      }
      if (variableRef.current) {
        await variableRef.current.updateDefinition(value)
      }
      void refreshCell()
    },
    [refreshCell, formulaContext, rootId, formulaId, formulaName]
  )

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaUpdatedViaId,
      e => {
        variableRef.current = e.payload
        void refreshCell()
      },
      {
        eventId: `${rootId},${formulaId}`,
        subscribeId: `UseFormula#${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [formulaId, refreshCell, rootId])

  const eventId = `${tableId},${cellId}`

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

  if (editingCell || editing) {
    return (
      <FormulaBlockRender
        saveOnBlur={true}
        formulaName={formulaName}
        rootId={rootId}
        formulaId={formulaId}
        updateFormula={updateFormula}
        formulaType="spreadsheet"
        width={width}
        minHeight={height ? height - 4 : undefined}
      />
    )
  }

  return (
    <div
      className="cell"
      style={{
        ...(width ? { width: `${width}px` } : {})
      }}
      onDoubleClick={handleEnterEdit}>
      <FormulaDisplay
        display={currentBlock.text}
        displayData={currentBlock.data.displayData}
        formulaType="spreadsheet"
      />
    </div>
  )
}
