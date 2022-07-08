import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'boolean' as const

export type FormulaBooleanType = BaseResult<typeof TypeName, boolean, boolean>

export const FormulaBooleanAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => rest,
  cast: rest => rest,
  display: ({ result, ...rest }) => ({ ...rest, result: String(result) })
}
