import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'literal' as const
const ShortName = 'literal' as const

export type FormulaLiteralType = BaseResult<typeof TypeName, string>

export const FormulaLiteralAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => rest,
  cast: rest => rest,
  display: rest => rest
}
