/* eslint-disable no-nested-ternary */
import { FC, useMemo } from 'react'
import { Popover } from '@brickdoc/design-system'
import { FormulaEditor } from '../../../editors/formulaEditor'
import { AutocompleteList, FormulaResult } from '../../ui/Formula'
import { VariableData } from '@brickdoc/formula'
import { CompletionType, UseFormulaInput, UseFormulaOutput } from './useFormula'
import * as Root from '../../ui/Formula/Formula.style'

export interface FormulaBlockRenderProps {
  meta: UseFormulaInput['meta']
  onSaveFormula: UseFormulaOutput['onSaveFormula']
  content: UseFormulaOutput['content']
  width?: number
  minHeight?: number

  temporaryVariableT: VariableData | undefined
  completion: CompletionType
}

export const FormulaBlockRender: FC<FormulaBlockRenderProps> = ({
  meta: { namespaceId: rootId, variableId: formulaId },
  onSaveFormula,
  width,
  minHeight,
  temporaryVariableT,
  content,
  completion
}) => {
  const formulaResult = useMemo(
    () => (
      <Root.BrickdocFormulaMenu>
        <FormulaResult variableT={temporaryVariableT} pageId={rootId} />
        <AutocompleteList rootId={rootId} formulaId={formulaId} completion={completion} />
      </Root.BrickdocFormulaMenu>
    ),
    [completion, formulaId, rootId, temporaryVariableT]
  )

  const editor = useMemo(
    () => (
      <FormulaEditor
        content={content}
        editable={true}
        onBlur={onSaveFormula}
        formulaId={formulaId}
        rootId={rootId}
        width={width}
        minHeight={minHeight}
      />
    ),
    [content, formulaId, onSaveFormula, rootId, width, minHeight]
  )

  const visible = !!(temporaryVariableT && temporaryVariableT.variableParseResult.kind !== 'literal')

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
