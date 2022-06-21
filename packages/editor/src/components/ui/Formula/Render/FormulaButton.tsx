import { Button } from '@mashcard/design-system'
import { FormulaSourceType, ButtonResult } from '@mashcard/formula'

export interface FormulaButtonProps {
  result: ButtonResult
  formulaType: FormulaSourceType
}

export const FormulaButton: React.FC<FormulaButtonProps> = ({ result }) => {
  return (
    <Button disabled={result.result.disabled} onClick={result.result.onClick}>
      {result.result.name}
    </Button>
  )
}
