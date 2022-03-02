import { AnyTypeResult, FormulaSourceType } from '@brickdoc/formula'

export interface FormulaLiteralProps {
  result: AnyTypeResult
  formulaType: FormulaSourceType
}

export const FormulaLiteral: React.FC<FormulaLiteralProps> = ({ result }) => {
  return <span>{result.result}</span>
}
