import { BaseResult } from '../type'

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

export type FormulaErrorType = BaseResult<'Error', string, string, ErrorType>
