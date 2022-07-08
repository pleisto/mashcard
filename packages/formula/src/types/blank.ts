import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Blank' as const

export type FormulaBlankType = BaseResult<typeof TypeName, 'Blank', '#N/A'>

export const FormulaBlankAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => ({ ...rest, result: '#N/A' }),
  cast: rest => ({ ...rest, result: 'Blank' }),
  display: rest => ({ ...rest, result: '#N/A' })
}
