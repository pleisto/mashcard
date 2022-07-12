import { FC, Suspense } from 'react'
import {
  dumpDisplayResultForDisplay,
  fetchResult,
  fetchVariableTError,
  resultToColorType,
  VariableData
} from '@mashcard/formula'
import { FormulaValue, FORMULA_ICONS } from '.'
import * as Root from './Formula.style'
import { UseFormulaInput } from '../../blockViews/FormulaView'
import { FormulaError } from './FormulaError'

export interface FormulaResultProps {
  variableT: VariableData | undefined
  meta: UseFormulaInput['meta']
}

export const FormulaResult: FC<FormulaResultProps> = ({ variableT, meta }) => {
  if (!variableT) return null
  const result = fetchResult(variableT)
  const colorType = resultToColorType(result)
  const icon = FORMULA_ICONS[colorType]

  const error = fetchVariableTError(variableT)

  const formulaResult = error ? (
    <Suspense fallback={<></>}>
      <FormulaError error={error} />
    </Suspense>
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
