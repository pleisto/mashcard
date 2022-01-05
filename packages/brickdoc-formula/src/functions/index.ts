import { BasicFunctionClause, FunctionGroup, FunctionKey, FunctionNameType } from '../types'
import { CORE_API_CLAUSES } from './api'
import { CORE_SPREADSHEET_CLAUSES } from './spreadsheet'
import { CORE_DATE_CLAUSES } from './date'
import { CORE_ERROR_CLAUSES } from './error'
import { CORE_LOGIC_CLAUSES } from './logic'
import { CORE_MATH_CLAUSES } from './math'
import { CORE_OBJECT_CLAUSES } from './object'
import { CORE_STATISTICAL_CLAUSES } from './statistical'
import { CORE_STRING_CLAUSES } from './string'
import { CORE_TEXT_CLAUSES } from './text'
import { CORE_POWERFX_CLAUSES } from './power_fx'
import { CORE_CONTROL_CLAUSES } from './control'
import { CORE_CORE_CLAUSES } from './core'
import { CORE_CONVERT_CLAUSES } from './convert'
import { CORE_ARRAY_CLAUSES } from './array'

export const buildFunctionKey = (group: FunctionGroup, name: FunctionNameType): FunctionKey => {
  if (group === 'core') {
    return name
  }
  return `${group}::${name}`
}

export const BUILTIN_CLAUSES: Array<BasicFunctionClause<any>> = [
  ...CORE_API_CLAUSES,
  ...CORE_TEXT_CLAUSES,
  ...CORE_SPREADSHEET_CLAUSES,
  ...CORE_STRING_CLAUSES,
  ...CORE_LOGIC_CLAUSES,
  ...CORE_MATH_CLAUSES,
  ...CORE_STATISTICAL_CLAUSES,
  ...CORE_DATE_CLAUSES,
  ...CORE_OBJECT_CLAUSES,
  ...CORE_ERROR_CLAUSES,
  ...CORE_POWERFX_CLAUSES,
  ...CORE_CONTROL_CLAUSES,
  ...CORE_CORE_CLAUSES,
  ...CORE_CONVERT_CLAUSES,
  ...CORE_ARRAY_CLAUSES
]
