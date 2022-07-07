import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'literal' as const

export type FormulaLiteralType = BaseResult<typeof TypeName, string>

export const FormulaLiteralAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => rest,
  cast: rest => rest
}
