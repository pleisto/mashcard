import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Waiting' as const

export type FormulaWaitingType = BaseResult<typeof TypeName, string>

export const FormulaWaitingAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => rest,
  cast: rest => rest,
  display: ({ result }) => `#<Waiting>`
}
