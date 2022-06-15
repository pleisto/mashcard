import { AnyFunctionClause, FunctionGroup, FunctionKey, FunctionNameType } from '../types'
import * as ApiFunctions from './api'
import * as ArrayFunctions from './array'
import * as ControlFunctions from './control'
import * as ConvertFunctions from './convert'
import * as CoreFunctions from './core'
import * as DateFunctions from './date'
import * as ErrorFunctions from './error'
import * as LogicFunctions from './logic'
import * as MathFunctions from './math'
import * as ObjectFunctions from './object'
import * as PowerFxFunctions from './powerfx'
import * as ProcessFunctions from './process'
import * as RequestFunctions from './request'
import * as SpreadsheetFunctions from './spreadsheet'
import * as StringFunctions from './string'

export * from './api'
export * from './array'
export * from './control'
export * from './convert'
export * from './core'
export * from './date'
export * from './error'
export * from './logic'
export * from './math'
export * from './object'
export * from './powerfx'
export * from './process'
export * from './request'
export * from './spreadsheet'
export * from './string'

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

export const BUILTIN_CLAUSES: AnyFunctionClause[] = Object.values({
  ...ApiFunctions,
  ...ArrayFunctions,
  ...ControlFunctions,
  ...ConvertFunctions,
  ...CoreFunctions,
  ...DateFunctions,
  ...ErrorFunctions,
  ...LogicFunctions,
  ...MathFunctions,
  ...ObjectFunctions,
  ...PowerFxFunctions,
  ...ProcessFunctions,
  ...RequestFunctions,
  ...SpreadsheetFunctions,
  ...StringFunctions
})
