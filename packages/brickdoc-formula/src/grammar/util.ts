import _ from 'lodash'
import {
  AnyTypeResult,
  CodeFragment,
  ErrorMessage,
  ErrorResult,
  EventDependency,
  EventScope,
  ExpressionType,
  FormulaColorType,
  FormulaType,
  FunctionContext
} from '../types'
import { InterpretArgument } from './interpreter'
import { FormulaLexer } from './lexer'

// eslint-disable-next-line complexity
export const shouldReceiveEvent = (listenedScope: EventScope, eventScope: EventScope | undefined): boolean => {
  if (!eventScope) return true

  const listenedRows = listenedScope.rows ?? []
  const listenedColumns = listenedScope.columns ?? []
  const eventRows = eventScope.rows ?? []
  const eventColumns = eventScope.columns ?? []

  // Whole spreadsheet change
  if (eventRows.length === 0 && eventColumns.length === 0) return true

  // Listen to spreadsheet, ignore cell change
  if (listenedRows.length === 0 && listenedColumns.length === 0 && eventRows.length > 0 && eventColumns.length > 0)
    return false

  // Listen to column, change row
  if (listenedRows.length === 0 && listenedColumns.length > 0 && eventRows.length > 0 && eventColumns.length === 0)
    return true

  // Listen to row, change column
  if (listenedRows.length > 0 && listenedColumns.length === 0 && eventRows.length === 0 && eventColumns.length > 0)
    return true

  const rowMatched = _.intersection(listenedRows, eventRows).length > 0
  const columnMatched = _.intersection(listenedColumns, eventColumns).length > 0

  if (!listenedRows.length && !listenedColumns.length) return true

  if (listenedRows.length && listenedColumns.length) {
    if (eventRows.length && eventColumns.length) {
      return rowMatched && columnMatched
    }

    if (eventRows.length) {
      return rowMatched
    } else {
      return columnMatched
    }
  }

  if (listenedRows.length) {
    return rowMatched
  } else {
    return columnMatched
  }
}

export const cleanupEventDependency = (label: string, dependencies: EventDependency[]): EventDependency[] => {
  if (!dependencies.length) return []
  const finalEventDependencies: EventDependency[] = []

  dependencies.forEach((dependency, index) => {
    const lastDependency = dependencies[index - 1]

    if (dependency.cleanup && lastDependency) {
      if (lastDependency.key === dependency.cleanup.key) {
        finalEventDependencies.pop()
      } else {
        console.error('cleanupEventDependency not matched', { label, dependency, lastDependency, dependencies })
      }
    }

    finalEventDependencies.push(dependency)
  })

  // console.log('start cleanup', label, dependencies, finalEventDependencies)
  return finalEventDependencies
}

export const reverseTraversalString = (str: string, min = 1): string[] => {
  const result: string[] = []

  for (let i = str.length - 1; i >= min; i--) {
    result.push(str.slice(0, i))
  }

  return result
}

// TODO: dirty hack to get the string literal value
export const parseString = (str: string): string => {
  if (!str.startsWith('"')) {
    return str
  }
  return str.substring(1, str.length - 1).replace(/""/g, '"')
}

const lexer = FormulaLexer

export const checkValidName = (name: string): boolean => {
  if (name.length !== name.trim().length) {
    return false
  }

  const { tokens, errors } = lexer.tokenize(name)

  if (errors.length > 0) {
    return false
  }

  if (tokens.length !== 1) {
    return false
  }

  return tokens[0].tokenType.name === 'FunctionName'
}

export const maybeEncodeString = (str: string): [boolean, string] => {
  const valid = checkValidName(str)
  if (valid) {
    return [true, str]
  }
  return [false, encodeString(str)]
}

export const shouldReturnEarly = (result: AnyTypeResult | undefined, skipReturnEarlyCheck?: boolean): boolean => {
  if (skipReturnEarlyCheck) return false
  if (!result) return false
  if (['Error', 'Blank', 'Pending', 'Waiting'].includes(result.type)) {
    return true
  }

  return false
}

const encodeString = (str: string): string => {
  return `"${str}"`
}
export const objectDiff = <T>(a: T[], b: T[]): Record<number, T> =>
  _.fromPairs(_.differenceWith(_.toPairs(a), _.toPairs(b), _.isEqual))

export const truncateString = (str: string, length: number = 20): string => {
  if (typeof str !== 'string') return str
  if (length === -1 || str.length < length) return str
  // console.log({ str })
  return `${str.substring(0, length)}...`
}

export const truncateArray = (array: any[], length: number = 8): any[] => {
  if (!Array.isArray(array)) return array
  if (array.length < length) return array
  return array.slice(0, length).concat(['...'])
}

export const extractSubType = (array: AnyTypeResult[]): FormulaType => {
  const types = array.map(a => a.type)
  const uniqTypes = [...new Set(types)]

  if (uniqTypes.length === 0) {
    return 'void'
  }

  if (uniqTypes.length === 1) {
    return uniqTypes[0]
  }

  return 'any'
}

export const intersectType = (
  expectedArgumentType: ExpressionType,
  contextResultType: FormulaType,
  label: string,
  ctx: FunctionContext
): { errorMessages: ErrorMessage[]; newType: FormulaType } => {
  if (expectedArgumentType === undefined) {
    return { errorMessages: [], newType: contextResultType }
  }

  // if (contextResultType === 'Pending') {
  //   return { errorMessages: [], newType: 'any' }
  // }

  if (expectedArgumentType === 'any') {
    return { errorMessages: [], newType: contextResultType }
  }

  if (['any', 'Pending', 'Waiting'].includes(contextResultType)) {
    return {
      errorMessages: [],
      newType: expectedArgumentType instanceof Array ? expectedArgumentType[0] : expectedArgumentType
    }
  }

  if (expectedArgumentType instanceof Array && expectedArgumentType.includes(contextResultType)) {
    return { errorMessages: [], newType: contextResultType }
  }

  if (expectedArgumentType === contextResultType) {
    return { errorMessages: [], newType: expectedArgumentType }
  }

  if (expectedArgumentType === 'Reference') {
    return { errorMessages: [], newType: expectedArgumentType }
  }
  if (expectedArgumentType === 'Cst') {
    return { errorMessages: [], newType: expectedArgumentType }
  }

  if (expectedArgumentType === 'Predicate') {
    return { errorMessages: [], newType: contextResultType }
  }

  if (contextResultType === 'Error') {
    return { errorMessages: [], newType: contextResultType }
  }

  // console.error({ expectedArgumentType, contextResultType, label, ctx })

  return {
    errorMessages: [{ type: 'type', message: `Expected ${expectedArgumentType} but got ${contextResultType}` }],
    newType: contextResultType
  }
}

export const runtimeCheckType = (
  { type: expectedArgumentType, skipCheck }: InterpretArgument,
  contextResultType: FormulaType,
  label: string,
  ctx: FunctionContext
): ErrorResult | undefined => {
  if (skipCheck) {
    return undefined
  }

  const { errorMessages } = intersectType(expectedArgumentType, contextResultType, `[Runtime] ${label}`, ctx)

  if (errorMessages.length > 0) {
    const { type, message } = errorMessages[0]
    // console.log('runtimeCheckType', { label, expectedArgumentType, contextResultType, errorMessages })
    return { type: 'Error', result: message, errorKind: type }
  }

  return undefined
}

export const columnDisplayIndex = (index: number): string => {
  const r = index % 26
  const l = Math.floor(index / 26)
  return `${l > 0 ? columnDisplayIndex(l - 1) : ''}${String.fromCharCode(65 + r)}`
}

export const resultToColorType = ({ type, result }: AnyTypeResult): FormulaColorType => {
  if (type === 'boolean') {
    return result ? 'TRUE' : 'FALSE'
  }

  if (type === 'Column' && result.logic) return 'LogicColumn'
  if (type === 'Row' && result.logic) return 'LogicRow'

  return type
}

export const attrsToColorType = ({ code, display, attrs }: CodeFragment): FormulaColorType | string => {
  switch (code) {
    case 'NullLiteral':
      return 'null'
    case 'NumberLiteral':
      return 'number'
    case 'StringLiteral':
      return 'string'
    case 'BooleanLiteral':
      return display === 'true' ? 'TRUE' : 'FALSE'
    case 'Column':
    case 'Row':
      return attrs.kind as FormulaColorType
    default:
      return code as FormulaColorType
  }
}

export const castNumber = (data: AnyTypeResult | undefined): number => {
  if (!data) return NaN
  if (data.type === 'number') return data.result
  if (data.type === 'Cell') {
    return Number(data.result.value)
  }

  return NaN
}

export const castData = (data: any): AnyTypeResult => {
  switch (typeof data) {
    case 'string':
      return { type: 'string', result: data }
    case 'number':
      return { type: 'number', result: data }
    case 'boolean':
      return { type: 'boolean', result: data }
    case 'function':
      // TODO function
      return { type: 'null', result: null }
    default:
      break
  }

  if (data === null || data === undefined) return { type: 'null', result: null }

  if (Array.isArray(data)) {
    const result = data.map(e => castData(e))
    return { type: 'Array', subType: extractSubType(result), result }
  }

  const object: object = data
  const newObject: { [key: string]: AnyTypeResult } = {}
  Object.entries(object).forEach(([k, v]) => {
    newObject[k] = castData(v)
  })

  return { type: 'Record', result: newObject, subType: extractSubType(Object.values(newObject)) }
}
