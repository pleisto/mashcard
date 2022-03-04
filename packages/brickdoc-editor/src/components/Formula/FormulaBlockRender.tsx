/* eslint-disable no-nested-ternary */
import React from 'react'
import { Popover } from '@brickdoc/design-system'
import './FormulaBlockRender.less'
import { VariableInterface, FormulaSourceType } from '@brickdoc/formula'
import { useFormula } from './useFormula'
import { FormulaResult } from './FormulaResult'
import { FormulaEditor } from '../../extensions/formula/FormulaEditor/FormulaEditor'
import { BrickdocEventBus, FormulaEditorSaveEventTrigger } from '@brickdoc/schema'
import { AutocompleteList } from './AutocompleteList/AutocompleteList'
import { EditorDataSourceContext } from '../../dataSource/DataSource'

export interface FormulaBlockRenderProps {
  formulaId: string
  formulaName: string
  formulaType: FormulaSourceType
  rootId: string
  saveOnBlur: boolean
  updateFormula: (variable: VariableInterface | undefined) => void
  width?: number
}

export const FormulaBlockRender: React.FC<FormulaBlockRenderProps> = ({
  formulaId,
  rootId,
  formulaName,
  formulaType,
  saveOnBlur,
  updateFormula,
  width
}) => {
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const formulaContext = editorDataSource.formulaContext
  const { variableT, editorContent, handleSelectActiveCompletion, completion, setCompletion, updateEditor } =
    useFormula({
      rootId,
      formulaId,
      updateFormula,
      formulaType,
      formulaName,
      formulaContext
    })

  const formulaResult = React.useMemo(
    () => (
      <>
        <FormulaResult variableT={variableT} pageId={rootId} />
        <AutocompleteList
          blockId={rootId}
          completion={completion}
          handleSelectActiveCompletion={handleSelectActiveCompletion}
          setCompletion={setCompletion}
        />
      </>
    ),
    [completion, handleSelectActiveCompletion, rootId, setCompletion, variableT]
  )

  const onEditorBlur = React.useCallback((): void => {
    if (saveOnBlur) {
      BrickdocEventBus.dispatch(FormulaEditorSaveEventTrigger({ formulaId, rootId }))
    }
  }, [formulaId, rootId, saveOnBlur])

  const editor = React.useMemo(
    () => (
      <FormulaEditor
        editorContent={editorContent}
        updateEditor={updateEditor}
        editable={true}
        onBlur={onEditorBlur}
        formulaId={formulaId}
        rootId={rootId}
        width={width}
      />
    ),
    [editorContent, formulaId, onEditorBlur, rootId, updateEditor, width]
  )

  const visible = !!(variableT && variableT.kind !== 'literal')

  return (
    <Popover
      defaultVisible={true}
      visible={visible}
      className="brickdoc-formula-menu-popover"
      destroyTooltipOnHide={true}
      content={formulaResult}
      placement="bottom"
      trigger={['click']}
    >
      {editor}
    </Popover>
  )
}
