import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Date' as const

export type FormulaDateType = BaseResult<typeof TypeName, Date>

const date2string = (date: Date): string => {
  return isNaN(date as unknown as number) ? date.toDateString() : date.toISOString()
}

export const FormulaDateAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: ({ result, ...rest }) => ({ ...rest, result: date2string(result) }),
  cast: ({ result, ...rest }) => ({ ...rest, result: new Date(result) }),
  display: ({ result }) => date2string(result)
}
