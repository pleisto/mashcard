import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'string' as const
const ShortName = 'str' as const

export type FormulaStringType = BaseResult<typeof TypeName, string>

export const FormulaStringAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => rest,
  cast: rest => rest,
  display: rest => rest
}
