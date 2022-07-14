import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Date' as const
const ShortName = 'date' as const

export type FormulaDateType = BaseResult<typeof TypeName, Date>

const date2string = (date: Date): string => {
  return isNaN(date as unknown as number) ? date.toDateString() : date.toISOString()
}

export const FormulaDateAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: ({ result, ...rest }) => ({ ...rest, result: date2string(result) }),
  cast: ({ result, ...rest }) => ({ ...rest, result: new Date(result) }),
  display: ({ result, ...rest }) => ({ ...rest, result: date2string(result) })
}
