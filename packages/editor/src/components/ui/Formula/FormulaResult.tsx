import { FC } from 'react'
import {
  dumpDisplayResultForDisplay,
  ErrorMessage,
  fetchResult,
  fetchVariableTError,
  resultToColorType,
  VariableData
} from '@mashcard/formula'
import { FormulaValue, FORMULA_ICONS } from '.'
import * as Root from './Formula.style'
import { UseFormulaInput } from '../../blockViews/FormulaView'
import { useFormulaI18n } from '../../../hooks/useFormulaI18n'

export interface FormulaResultProps {
  variableT: VariableData | undefined
  meta: UseFormulaInput['meta']
}

export const FormulaResult: FC<FormulaResultProps> = ({ variableT, meta }) => {
  const { t } = useFormulaI18n()

  if (!variableT) return null
  const result = fetchResult(variableT)
  const colorType = resultToColorType(result)
  const icon = FORMULA_ICONS[colorType]

  const error: ErrorMessage | undefined = fetchVariableTError(variableT)

  const formulaResult = error ? (
    <span className="formula-result-error">
      <span className="formula-result-error-type">{error.type}</span>
      <span className="formula-result-error-message">{t(error.message)}</span>
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
