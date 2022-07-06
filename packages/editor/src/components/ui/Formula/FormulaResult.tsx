import { FC } from 'react'
import {
  dumpDisplayResultForDisplay,
  errorIsFatal,
  ErrorMessage,
  fetchResult,
  resultToColorType,
  VariableData
} from '@mashcard/formula'
import { FormulaValue, FORMULA_ICONS } from '.'
import * as Root from './Formula.style'

export interface FormulaResultProps {
  variableT: VariableData | undefined
  pageId: string
}

export const FormulaResult: FC<FormulaResultProps> = ({ variableT, pageId }) => {
  if (!variableT) {
    return null
  }

  if (
    variableT.meta.richType.type === 'normal' &&
    variableT.variableParseResult.definition.trim() === '=' &&
    !errorIsFatal(variableT)
  ) {
    return null
  }

  const result = fetchResult(variableT)
  const colorType = resultToColorType(result)
  const icon = FORMULA_ICONS[colorType]

  const error: ErrorMessage | undefined =
    !variableT.task.async && !variableT.task.variableValue.success
      ? { message: variableT.task.variableValue.result.result, type: variableT.task.variableValue.result.errorKind }
      : undefined

  const formulaResult = error ? (
    <span className="formula-result-error">
      <span className="formula-result-error-type">{error.type}</span>
      <span className="formula-result-error-message">{error.message}</span>
    </span>
  ) : (
    <span className="formula-result-ok">
      <span className="formula-result-ok-equal">=</span>
      <FormulaValue displayData={dumpDisplayResultForDisplay(variableT)} />
      <span className="formula-result-ok-icon">{icon}</span>
    </span>
  )

  return (
    <>
      <Root.FormulaResult>{formulaResult}</Root.FormulaResult>
    </>
  )
}
