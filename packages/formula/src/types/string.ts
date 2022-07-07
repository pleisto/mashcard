import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'string' as const

export type FormulaStringType = BaseResult<typeof TypeName, string>

export const FormulaStringAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => rest,
  cast: rest => rest
}
