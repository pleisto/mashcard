import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Pending' as const

export type FormulaPendingType = BaseResult<typeof TypeName, string>

export const FormulaPendingAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => rest,
  cast: rest => rest,
  display: ({ result }) => `#<Pending>`
}
