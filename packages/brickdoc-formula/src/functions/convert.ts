import { SpreadsheetType } from '../controls/types'
import {
  AnyTypeResult,
  ArrayResult,
  BasicFunctionClause,
  ErrorResult,
  FunctionContext,
  NumberResult,
  RecordResult,
  SpreadsheetResult,
  StringResult
} from '../types'

export const toNumber = (ctx: FunctionContext, string: StringResult): NumberResult | ErrorResult => {
  const result = Number(string.result)

  if (isNaN(result)) {
    return { type: 'Error', result: 'Not a number', errorKind: 'runtime' }
  }

  return { type: 'number', result }
}

export const toQrcode = (ctx: FunctionContext, { result }: StringResult): StringResult => {
  return { type: 'string', result, view: { type: 'qrcode', attrs: {} } }
}

export const toRecord = (ctx: FunctionContext, { type, result }: AnyTypeResult): RecordResult | ErrorResult => {
  if (!['Date'].includes(type)) {
    return { type: 'Error', result: 'Not support', errorKind: 'runtime' }
  }

  const date = result as Date

  return {
    type: 'Record',
    subType: 'number',
    result: {
      month: { type: 'number', result: date.getMonth() },
      hour: { type: 'number', result: date.getHours() },
      minutes: { type: 'number', result: date.getMinutes() },
      seconds: { type: 'number', result: date.getSeconds() },
      day: { type: 'number', result: date.getDate() },
      year: { type: 'number', result: date.getFullYear() }
    }
  }
}

export const toArray = (ctx: FunctionContext, { result, type }: AnyTypeResult): ArrayResult | ErrorResult => {
  switch (type) {
    case 'Spreadsheet':
      return {
        type: 'Array',
        subType: 'Array',
        result: (result as SpreadsheetType).toArray().map((row: string[]) => ({
          type: 'Array',
          subType: 'string',
          result: row.map(r => ({ type: 'string', result: r }))
        }))
      }
    case 'number':
      if ((result as number) < 0) {
        return { type: 'Error', result: 'Number should be positive', errorKind: 'runtime' }
      }
      return {
        type: 'Array',
        subType: 'number',
        result: Array.from(Array(result).keys()).map(n => ({ type: 'number', result: n }))
      }
    default:
      return { type: 'Error', result: 'Not support', errorKind: 'runtime' }
  }
}

export const toRecordArray = (ctx: FunctionContext, { result: spreadsheet }: SpreadsheetResult): ArrayResult => {
  return {
    type: 'Array',
    subType: 'Record',
    result: spreadsheet.toRecord().map(row => ({ type: 'Record', subType: 'string', result: row }))
  }
}

export const CORE_CONVERT_CLAUSES: Array<BasicFunctionClause<'number' | 'string' | 'Array' | 'Record'>> = [
  {
    name: 'toNumber',
    async: false,
    lazy: false,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Converts a string to a number',
    group: 'core',
    args: [
      {
        name: 'string',
        type: 'string'
      }
    ],
    examples: [
      { input: '=toNumber("123")', output: { type: 'number', result: 123 } },
      { input: '=toNumber("foo")', output: { type: 'Error', result: 'Not a number', errorKind: 'runtime' } }
    ],
    returns: 'number',
    testCases: [],
    chain: true,
    reference: toNumber
  },
  {
    name: 'toQrcode',
    async: false,
    lazy: false,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Converts a string to a qrcode',
    group: 'core',
    args: [
      {
        name: 'string',
        type: 'string'
      }
    ],
    examples: [
      { input: '=toQrcode("123")', output: { type: 'string', result: '123', view: { type: 'qrcode', attrs: {} } } }
    ],
    returns: 'string',
    testCases: [],
    chain: true,
    reference: toQrcode
  },
  {
    name: 'toRecordArray',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'Array', subType: 'void', result: [] } }],
    description: 'Converts the value to a record.',
    group: 'core',
    args: [
      {
        name: 'spreadsheet',
        type: 'Spreadsheet'
      }
    ],
    returns: 'Array',
    testCases: [],
    chain: true,
    reference: toRecordArray
  },
  {
    name: 'toArray',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'Array', subType: 'void', result: [] } }],
    description: 'Converts the value to an array.',
    group: 'core',
    args: [
      {
        name: 'input',
        type: 'any'
      }
    ],
    returns: 'Array',
    testCases: [],
    chain: true,
    reference: toArray
  },
  {
    name: 'toRecord',
    async: false,
    lazy: false,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Converts the value to a record.',
    group: 'core',
    args: [
      {
        name: 'input',
        type: 'any'
      }
    ],
    examples: [
      {
        input: '=toRecord(new Date())',
        output: {
          type: 'Record',
          subType: 'number',
          result: {
            month: { type: 'number', result: 0 },
            hour: { type: 'number', result: 0 },
            minutes: { type: 'number', result: 0 },
            seconds: { type: 'number', result: 0 },
            day: { type: 'number', result: 1 },
            year: { type: 'number', result: 1970 }
          }
        }
      },
      { input: '=toRecord(123)', output: { type: 'Error', result: 'Not support', errorKind: 'runtime' } }
    ],
    returns: 'Record',
    testCases: [],
    chain: true,
    reference: toRecord
  }
]
