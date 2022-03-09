/* eslint-disable no-nested-ternary */
import React from 'react'
import { Popover } from '@brickdoc/design-system'
import './Formula.less'
import { VariableInterface, FormulaSourceType } from '@brickdoc/formula'
import { useFormula } from './useFormula'
import { FormulaResult } from './FormulaResult'
import { FormulaEditor } from '../../extensions/formula/FormulaEditor/FormulaEditor'
import { BrickdocEventBus, FormulaEditorSaveEventTrigger } from '@brickdoc/schema'
import { AutocompleteList } from './AutocompleteList/AutocompleteList'
import { EditorDataSourceContext } from '../../dataSource/DataSource'
import * as Sentry from '@sentry/react'
export interface FormulaBlockRenderProps {
  formulaId: string
  display: string
  formulaName: string
  formulaType: FormulaSourceType
  rootId: string
  saveOnBlur: boolean
  updateFormula: (variable: VariableInterface | undefined) => void
  width?: number
  minHeight?: number
}

export const FormulaBlockRender: React.FC<FormulaBlockRenderProps> = ({
  formulaId,
  rootId,
  display,
  formulaName,
  formulaType,
  saveOnBlur,
  updateFormula,
  width,
  minHeight
}) => {
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const formulaContext = editorDataSource.formulaContext
  const { variableT, editorContent, completion, updateEditor } = useFormula({
    rootId,
    formulaId,
    updateFormula,
    formulaType,
    formulaName,
    formulaContext
  })

  if (!variableT && display) {
    Sentry.withScope(scope => {
      const error = new Error(`Variable is undefined`)
      scope.setExtra('display', display)
      scope.setExtra('formulaId', formulaId)
      scope.setExtra('rootId', rootId)
      scope.setExtra('formulaName', formulaName)
      error.message = `Variable is undefined`
      Sentry.captureException(error)
    })
  }

  const formulaResult = React.useMemo(
    () => (
      <div className="brickdoc-formula-menu">
        <FormulaResult variableT={variableT} pageId={rootId} />
        <AutocompleteList rootId={rootId} formulaId={formulaId} completion={completion} />
      </div>
    ),
    [completion, formulaId, rootId, variableT]
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
        minHeight={minHeight}
      />
    ),
    [editorContent, formulaId, onEditorBlur, rootId, updateEditor, width, minHeight]
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
