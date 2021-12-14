import { ContextInterface, BasicFunctionClause, DateResult } from '..'

export const TODAY = (ctx: ContextInterface): DateResult => ({ result: new Date(), type: 'Date' })

export const CORE_DATE_CLAUSES: Array<BasicFunctionClause<'Date'>> = [
  {
    name: 'TODAY',
    async: false,
    pure: false,
    effect: false,
    examples: [{ input: '=TODAY()', output: { type: 'Date', result: new Date('1926-08-17T00:00:00.000Z') } }],
    description: 'Returns the current date',
    group: 'core',
    args: [],
    testCases: [],
    returns: 'Date',
    chain: false,
    reference: TODAY
  }
]
