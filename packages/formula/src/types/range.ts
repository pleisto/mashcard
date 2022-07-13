import { RangeType } from '../controls'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Range' as const
const ShortName = 'range' as const

export type FormulaRangeType = BaseResult<typeof TypeName, RangeType>

export const FormulaRangeAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => ({ ...rest, result: 'Not supported' }),
  cast: rest => ({ ...rest, result: 'Not supported', meta: 'runtime', type: 'Error' }),
  display: rest => ({ ...rest, result: '#<Range>' })
}
