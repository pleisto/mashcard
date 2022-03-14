/* eslint-disable no-nested-ternary */
import { FC, useMemo, useCallback } from 'react'
import { Popover } from '@brickdoc/design-system'
import './Formula.less'
import { FormulaResult } from './FormulaResult'
import { FormulaEditor, EditorContentType } from '../../../extensions/blocks/formula/FormulaEditor/FormulaEditor'
import { BrickdocEventBus, FormulaEditorSaveEventTrigger } from '@brickdoc/schema'
import { AutocompleteList } from './AutocompleteList/AutocompleteList'
import { VariableData } from '@brickdoc/formula'
import { JSONContent } from '@tiptap/core'
import { CompletionType } from './useFormula'
export interface FormulaBlockRenderProps {
  formulaId: string
  rootId: string
  saveOnBlur: boolean
  width?: number
  minHeight?: number

  variableT: VariableData | undefined
  editorContent: EditorContentType
  updateEditor: (content: JSONContent, position: number) => void
  completion: CompletionType
}

export const FormulaBlockRender: FC<FormulaBlockRenderProps> = ({
  formulaId,
  rootId,
  saveOnBlur,
  width,
  minHeight,
  variableT,
  editorContent,
  completion,
  updateEditor
}) => {
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
