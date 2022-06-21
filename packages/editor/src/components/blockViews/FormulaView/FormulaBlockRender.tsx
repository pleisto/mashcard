/* eslint-disable no-nested-ternary */
import { FC, useMemo } from 'react'
import { Popover } from '@mashcard/design-system'
import { FormulaEditor } from '../../../editors/formulaEditor'
import { AutocompleteList, FormulaResult } from '../../ui/Formula'
import { VariableData } from '@mashcard/formula'
import { CompletionType, UseFormulaInput, UseFormulaOutput } from './useFormula'
import * as Root from '../../ui/Formula/Formula.style'

export interface FormulaBlockRenderProps {
  meta: UseFormulaInput['meta']
  formulaEditor: UseFormulaOutput['formulaEditor']
  width?: number
  minHeight?: number
  temporaryVariableT: VariableData | undefined
  completion: CompletionType
}

export const FormulaBlockRender: FC<FormulaBlockRenderProps> = ({
  meta: { namespaceId: rootId, variableId: formulaId },
  width,
  minHeight,
  temporaryVariableT,
  formulaEditor,
  completion
}) => {
  const formulaResult = useMemo(
    () => (
      <Root.MashcardFormulaMenu>
        <FormulaResult variableT={temporaryVariableT} pageId={rootId} />
        <AutocompleteList rootId={rootId} formulaId={formulaId} completion={completion} />
      </Root.MashcardFormulaMenu>
    ),
    [completion, formulaId, rootId, temporaryVariableT]
  )

  const visible = !!(temporaryVariableT && temporaryVariableT.variableParseResult.kind !== 'literal')

  return (
    <Popover
      defaultVisible={true}
      visible={visible}
      className={Root.MashcardFormulaMenuPopover}
      destroyTooltipOnHide={true}
      content={formulaResult}
      placement="bottom"
      trigger={['click']}>
      <FormulaEditor formulaEditor={formulaEditor} width={width} minHeight={minHeight} />
    </Popover>
  )
}
