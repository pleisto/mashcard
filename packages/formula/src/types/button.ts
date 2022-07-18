import { ButtonType } from '../controls'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Button' as const
const ShortName = 'button' as const

export type FormulaButtonType = BaseResult<typeof TypeName, ButtonType>

export const FormulaButtonAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => ({ ...rest, result: 'other.not_supported' }),
  cast: rest => ({ ...rest, result: { message: 'other.not_supported', type: 'runtime' }, type: 'Error' }),
  display: rest => ({ ...rest, result: '#<Button>' })
}
