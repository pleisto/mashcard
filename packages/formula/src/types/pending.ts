import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Pending' as const
const ShortName = 'pending' as const

export type FormulaPendingType = BaseResult<typeof TypeName, string>

export const FormulaPendingAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => rest,
  cast: rest => rest,
  display: rest => ({ ...rest, result: '#<Pending>' })
}
