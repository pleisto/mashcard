import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'number' as const

export type FormulaNumberType = BaseResult<typeof TypeName, number, number>

export const FormulaNumberAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => rest,
  cast: rest => rest,
  display: ({ result, ...rest }) => ({ ...rest, result: String(result) })
}
