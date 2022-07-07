import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Date' as const

export type FormulaDateType = BaseResult<typeof TypeName, Date>

export const FormulaDateAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: ({ result, ...rest }) => ({
    ...rest,
    result: isNaN(result as unknown as number) ? result.toDateString() : result.toISOString()
  }),
  cast: ({ result, ...rest }) => ({ ...rest, result: new Date(result) })
}
