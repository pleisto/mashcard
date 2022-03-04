import React from 'react'
import { displayValue, dumpDisplayResult, errorIsFatal, ErrorMessage, VariableData } from '@brickdoc/formula'
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

  const variableValue = variableT.variableValue

  const error: ErrorMessage | undefined = variableValue.success
    ? undefined
    : { message: variableValue.result.result, type: variableValue.result.errorKind }

  const result = error ? (
    <span className="formula-result-error">
      <span className="formula-result-error-type">{error.type}</span>
      <span className="formula-result-error-message">{error.message}</span>
    </span>
  ) : (
    <span className="formula-result-ok">
      <span className="formula-result-ok-equal">=</span>
      <FormulaValue
        displayData={dumpDisplayResult(variableT, true)}
        display={displayValue(variableT.variableValue.result, pageId)}
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
