import React from 'react'
import {
  displayValue,
  dumpDisplayResultForDisplay,
  errorIsFatal,
  ErrorMessage,
  fetchResult,
  VariableData
} from '@brickdoc/formula'
import './Formula.less'
import { FormulaValue } from './FormulaValue'

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

  const error: ErrorMessage | undefined =
    !variableT.task.async && !variableT.task.variableValue.success
      ? { message: variableT.task.variableValue.result.result, type: variableT.task.variableValue.result.errorKind }
      : undefined

  const result = error ? (
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
    </span>
  )

  return (
    <>
      <div className="formula-result">{result}</div>
      <div className="formula-divider" />
    </>
  )
}
