import { BaseFunctionClause, DateResult, StringResult, FunctionContext } from '../types'

export const NOW = (ctx: FunctionContext): DateResult => ({ result: new Date(), type: 'Date' })

export const DATE = (ctx: FunctionContext, date: StringResult): DateResult => ({
  result: new Date(date.result),
  type: 'Date'
})

export const CORE_DATE_CLAUSES: Array<BaseFunctionClause<'Date'>> = [
  {
    name: 'NOW',
    async: false,
    pure: false,
    persist: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=NOW()', output: { type: 'Date', result: new Date('1926-08-17T00:00:00.000Z') } }],
    description: 'Returns the current date',
    group: 'core',
    args: [],
    testCases: [],
    returns: 'Date',
    chain: false,
    reference: NOW
  },
  {
    name: 'DATE',
    async: false,
    pure: true,
    persist: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [
      {
        input: '=DATE("1926-08-17")',
        output: { type: 'Date', result: new Date('1926-08-17') }
      }
    ],
    description: 'Returns the date specified by the input',
    group: 'core',
    args: [
      {
        type: 'string',
        name: 'date'
      }
    ],
    testCases: [],
    returns: 'Date',
    chain: false,
    reference: DATE
  }
]
