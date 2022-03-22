import React from 'react'
import {
  displayValue,
  dumpDisplayResultForDisplay,
  errorIsFatal,
  ErrorMessage,
  fetchResult,
  resultToColorType,
  VariableData
} from '@brickdoc/formula'
import './Formula.less'
import { FormulaValue } from './FormulaValue'
import { FORMULA_ICONS } from '../../../helpers'

export interface FormulaResultProps {
  variableT: VariableData | undefined
  pageId: string
}

export const FormulaResult: React.FC<FormulaResultProps> = ({ variableT, pageId }) => {
  if (!variableT) {
    return <></>
  }

  if (variableT.type === 'normal' && variableT.definition.trim() === '=' && !errorIsFatal(variableT)) {
    return <></>
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
      <FormulaValue
        displayData={dumpDisplayResultForDisplay(variableT)}
        display={displayValue(fetchResult(variableT), pageId)}
      />
      <span className="formula-result-ok-icon">{icon}</span>
    </span>
  )

  return (
    <>
      <div className="formula-result">{formulaResult}</div>
      <div className="formula-divider" />
    </>
  )
}
