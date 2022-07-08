import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'NoPersist' as const

export type FormulaNoPersistType = BaseResult<typeof TypeName, null, null>

export const FormulaNoPersistAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => rest,
  cast: rest => rest,
  display: () => '#<NoPersist>'
}
