import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'number' as const
const ShortName = 'num' as const

export type FormulaNumberType = BaseResult<typeof TypeName, number, number>

export const FormulaNumberAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => rest,
  cast: rest => rest,
  display: ({ result, ...rest }) => ({ ...rest, result: String(result) })
}
