import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'boolean' as const
const ShortName = 'bool' as const

export type FormulaBooleanType = BaseResult<typeof TypeName, boolean, boolean>

export const FormulaBooleanAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => rest,
  cast: rest => rest,
  display: ({ result, ...rest }) => ({ ...rest, result: String(result) })
}
