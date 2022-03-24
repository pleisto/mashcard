import { Input } from '@brickdoc/design-system'
import { FormulaSourceType, InputResult } from '@brickdoc/formula'

export interface FormulaInputProps {
  result: InputResult
  formulaType: FormulaSourceType
}

export const FormulaInput: React.FC<FormulaInputProps> = ({ result }) => {
  return (
    <Input
      disabled={result.result.disabled}
      onChange={e => result.result.onChange?.(e.target.value)}
      value={result.result.value}
    />
  )
}
