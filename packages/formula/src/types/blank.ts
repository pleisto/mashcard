import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Blank' as const
const ShortName = 'blank' as const

export type FormulaBlankType = BaseResult<typeof TypeName, 'Blank', 'Blank'>

export const FormulaBlankAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => ({ ...rest, result: 'Blank' }),
  cast: rest => ({ ...rest, result: 'Blank' }),
  display: rest => ({ ...rest, result: 'Blank' })
}
