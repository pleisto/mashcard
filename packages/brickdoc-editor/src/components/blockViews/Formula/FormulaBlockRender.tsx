/* eslint-disable no-nested-ternary */
import { FC, useMemo, useCallback } from 'react'
import { Popover } from '@brickdoc/design-system'
import './Formula.less'
import { VariableInterface, FormulaSourceType } from '@brickdoc/formula'
import { useFormula } from './useFormula'
import { FormulaResult } from './FormulaResult'
import { FormulaEditor } from '../../../extensions/blocks/formula/FormulaEditor/FormulaEditor'
import { BrickdocEventBus, FormulaEditorSaveEventTrigger } from '@brickdoc/schema'
import { AutocompleteList } from './AutocompleteList/AutocompleteList'
import * as Sentry from '@sentry/react'
import { useExternalProps } from '../../../hooks/useExternalProps'
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

export const FormulaBlockRender: FC<FormulaBlockRenderProps> = ({
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
  const externalProps = useExternalProps()
  const formulaContext = externalProps.formulaContext
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

  const formulaResult = useMemo(
    () => (
      <div className="brickdoc-formula-menu">
        <FormulaResult variableT={variableT} pageId={rootId} />
        <AutocompleteList rootId={rootId} formulaId={formulaId} completion={completion} />
      </div>
    ),
    [completion, formulaId, rootId, variableT]
  )

  const onEditorBlur = useCallback((): void => {
    if (saveOnBlur) {
      BrickdocEventBus.dispatch(FormulaEditorSaveEventTrigger({ formulaId, rootId }))
    }
  }, [formulaId, rootId, saveOnBlur])

  const editor = useMemo(
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
      trigger={['click']}>
      {editor}
    </Popover>
  )
}
