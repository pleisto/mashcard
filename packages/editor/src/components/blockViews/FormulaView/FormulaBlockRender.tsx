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
  meta,
  width,
  minHeight,
  temporaryVariableT,
  formulaEditor,
  completion
}) => {
  const { namespaceId: rootId, variableId: formulaId } = meta
  const formulaResult = useMemo(
    () => (
      <Root.MashcardFormulaMenu>
        <FormulaResult variableT={temporaryVariableT} meta={meta} />
        <AutocompleteList rootId={rootId} formulaId={formulaId} completion={completion} />
      </Root.MashcardFormulaMenu>
    ),
    [completion, formulaId, meta, rootId, temporaryVariableT]
  )

  const visible = !!(temporaryVariableT && temporaryVariableT.variableParseResult.kind !== 'literal')

  return (
    <Popover
      defaultVisible={true}
      visible={visible}
      className={Root.MashcardFormulaMenuPopover}
      destroyTooltipOnHide={true}
      content={formulaResult}
      placement="top"
      trigger={['click']}>
      <FormulaEditor formulaEditor={formulaEditor} width={width} minHeight={minHeight} />
    </Popover>
  )
}
