import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'null' as const
const ShortName = 'null' as const

export type FormulaNullType = BaseResult<typeof TypeName, null, null>

export const FormulaNullAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => rest,
  cast: rest => rest,
  display: ({ result, ...rest }) => ({ ...rest, result: 'null' })
}
