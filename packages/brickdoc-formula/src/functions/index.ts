import { AnyFunctionClause, FunctionGroup, FunctionKey, FunctionNameType } from '../types'
import { CORE_API_FUNCTION_CLAUSES } from './api'
import { CORE_ARRAY_FUNCTION_CLAUSES } from './array'
import { CORE_CONTROL_FUNCTION_CLAUSES } from './control'
import { CORE_CONVERT_FUNCTION_CLAUSES } from './convert'
import { CORE_CORE_FUNCTION_CLAUSES } from './core'
import { CORE_DATE_FUNCTION_CLAUSES } from './date'
import { CORE_ERROR_FUNCTION_CLAUSES } from './error'
import { CORE_LOGIC_FUNCTION_CLAUSES } from './logic'
import { CORE_MATH_FUNCTION_CLAUSES } from './math'
import { CORE_OBJECT_FUNCTION_CLAUSES } from './object'
import { CORE_POWERFX_FUNCTION_CLAUSES } from './powerfx'
import { CORE_PROCESS_FUNCTION_CLAUSES } from './process'
import { REQUEST_REQUEST_FUNCTION_CLAUSES } from './request'
import { CORE_SPREADSHEET_FUNCTION_CLAUSES } from './spreadsheet'
import { CORE_STRING_FUNCTION_CLAUSES } from './string'

export const buildFunctionKey = (
  group: FunctionGroup,
  name: FunctionNameType,
  disableUpcase?: boolean
): FunctionKey => {
  const upcaseName = disableUpcase ? name : name.toUpperCase()
  if (group === 'core') {
    return upcaseName
  }
  return `${group}::${upcaseName}`
}

export const BUILTIN_CLAUSES: AnyFunctionClause[] = [
  ...CORE_API_FUNCTION_CLAUSES,
  ...CORE_ARRAY_FUNCTION_CLAUSES,
  ...CORE_CONTROL_FUNCTION_CLAUSES,
  ...CORE_CONVERT_FUNCTION_CLAUSES,
  ...CORE_CORE_FUNCTION_CLAUSES,
  ...CORE_DATE_FUNCTION_CLAUSES,
  ...CORE_ERROR_FUNCTION_CLAUSES,
  ...CORE_LOGIC_FUNCTION_CLAUSES,
  ...CORE_MATH_FUNCTION_CLAUSES,
  ...CORE_OBJECT_FUNCTION_CLAUSES,
  ...CORE_POWERFX_FUNCTION_CLAUSES,
  ...CORE_PROCESS_FUNCTION_CLAUSES,
  ...REQUEST_REQUEST_FUNCTION_CLAUSES,
  ...CORE_SPREADSHEET_FUNCTION_CLAUSES,
  ...CORE_STRING_FUNCTION_CLAUSES
]
