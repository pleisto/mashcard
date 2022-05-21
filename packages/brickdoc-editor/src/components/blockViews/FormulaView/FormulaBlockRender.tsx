/* eslint-disable no-nested-ternary */
import { FC, useMemo, useCallback } from 'react'
import { Popover } from '@brickdoc/design-system'
import { FormulaEditor, EditorContentType } from '../../../editors/formulaEditor'
import { BrickdocEventBus, FormulaEditorSaveEventTrigger } from '@brickdoc/schema'
import { AutocompleteList, FormulaResult } from '../../ui/Formula'
import { VariableData } from '@brickdoc/formula'
import { JSONContent } from '@tiptap/core'
import { CompletionType } from './useFormula'
import * as Root from '../../ui/Formula/Formula.style'

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
      <Root.BrickdocFormulaMenu>
        <FormulaResult variableT={variableT} pageId={rootId} />
        <AutocompleteList rootId={rootId} formulaId={formulaId} completion={completion} />
      </Root.BrickdocFormulaMenu>
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
      className={Root.BrickdocFormulaMenuPopover}
      destroyTooltipOnHide={true}
      content={formulaResult}
      placement="bottom"
      trigger={['click']}
    >
      {editor}
    </Popover>
  )
}
