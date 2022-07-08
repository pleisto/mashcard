import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Error' as const

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

export type FormulaErrorType = BaseResult<typeof TypeName, string, [ErrorType, string], ErrorType>

export const FormulaErrorAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: ({ result, meta, ...rest }) => ({ ...rest, result: [meta, result] }),
  cast: ({ result, ...rest }) => ({ ...rest, result: result[1], meta: result[0] }),
  display: ({ result, meta, ...rest }) => ({ ...rest, result: `#<Error> ${result}` })
}
