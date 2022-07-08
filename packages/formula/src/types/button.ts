import { ButtonType } from '../controls'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Button' as const

export type FormulaButtonType = BaseResult<typeof TypeName, ButtonType>

export const FormulaButtonAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => ({ ...rest, result: 'Not supported' }),
  cast: rest => ({ ...rest, result: 'Not supported', meta: 'runtime', type: 'Error' }),
  display: rest => ({ ...rest, result: '#<Button>' })
}
