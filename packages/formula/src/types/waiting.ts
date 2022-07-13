import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Waiting' as const
const ShortName = 'waiting' as const

export type FormulaWaitingType = BaseResult<typeof TypeName, string>

export const FormulaWaitingAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => rest,
  cast: rest => rest,
  display: rest => ({ ...rest, result: '#<Waiting>' })
}
