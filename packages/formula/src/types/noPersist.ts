import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'NoPersist' as const
const ShortName = 'noPersist' as const

export type FormulaNoPersistType = BaseResult<typeof TypeName, null, null>

export const FormulaNoPersistAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => rest,
  cast: rest => rest,
  display: rest => ({ ...rest, result: '#<NoPersist>' })
}
