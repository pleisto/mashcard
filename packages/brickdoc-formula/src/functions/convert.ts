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
} from '..'

export const toNumber = (ctx: FunctionContext, string: StringResult): NumberResult | ErrorResult => {
  const result = Number(string.result)

  if (isNaN(result)) {
    return { type: 'Error', result: 'Not a number', errorKind: 'runtime' }
  }

  return { type: 'number', result }
}

export const toRecord = (ctx: FunctionContext, { type, result }: AnyTypeResult): RecordResult | ErrorResult => {
  if (!['Date'].includes(type)) {
    return { type: 'Error', result: 'Not support', errorKind: 'runtime' }
  }

  const date = result as Date

  return {
    type: 'Record',
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

export const toArray = (ctx: FunctionContext, { result: database }: SpreadsheetResult): ArrayResult => {
  return {
    type: 'Array',
    result: database.toArray().map(row => ({ type: 'Array', result: row.map(r => ({ type: 'string', result: r })) }))
  }
}

export const toRecordArray = (ctx: FunctionContext, { result: database }: SpreadsheetResult): ArrayResult => {
  return { type: 'Array', result: database.toRecord().map(row => ({ type: 'Record', result: row })) }
}

export const CORE_CONVERT_CLAUSES: Array<BasicFunctionClause<any>> = [
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
    name: 'toRecordArray',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'Array', result: [] } }],
    description: 'Converts the value to a record.',
    group: 'core',
    args: [
      {
        name: 'database',
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
    examples: [{ input: '=123', output: { type: 'Array', result: [] } }],
    description: 'Converts the value to an array.',
    group: 'core',
    args: [
      {
        name: 'database',
        type: 'Spreadsheet'
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
        output: { type: 'Record', result: { month: 0, hour: 0, minutes: 0, seconds: 0, day: 1, year: 1970 } }
      },
      { input: '=toRecord(123)', output: { type: 'Error', result: 'Not support', errorKind: 'runtime' } }
    ],
    returns: 'Record',
    testCases: [],
    chain: true,
    reference: toRecord
  }
]
