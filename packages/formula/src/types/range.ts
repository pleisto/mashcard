import { RangeType } from '../controls'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Range' as const
const ShortName = 'range' as const

export type FormulaRangeType = BaseResult<typeof TypeName, RangeType>

export const FormulaRangeAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => ({ ...rest, result: 'other.not_supported' }),
  cast: rest => ({ ...rest, result: { message: 'other.not_supported', type: 'runtime' }, type: 'Error' }),
  display: rest => ({ ...rest, result: '#<Range>' })
}
