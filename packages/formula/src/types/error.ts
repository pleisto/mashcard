import { BaseResult, ErrorMessage, FormulaTypeAttributes } from '../type'

const TypeName = 'Error' as const
const ShortName = 'error' as const

export type ErrorType =
  | 'type'
  | 'parse'
  | 'syntax'
  | 'runtime'
  | 'fatal'
  | 'deps'
  | 'circular_dependency'
  | 'name_unique'
  | 'name_check'
  | 'name_invalid'
  | 'custom'

export type FormulaErrorType = BaseResult<typeof TypeName, ErrorMessage, ErrorMessage>

export const FormulaErrorAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => rest,
  cast: rest => rest,
  display: ({ result, ...rest }, ctx) => ({ ...rest, result: `#<Error> ${ctx.i18n(result.message)}` })
}
