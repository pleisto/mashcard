import { FunctionContext, BaseFunctionClause, NumberResult } from '../types'

export const ADD = (ctx: FunctionContext, left: NumberResult, right: NumberResult): NumberResult => ({
  result: left.result + right.result,
  type: 'number'
})

export const CUSTOM_CLAUSES: Array<BaseFunctionClause<'number'>> = [
  {
    name: 'ADD',
    async: false,
    lazy: false,
    acceptError: false,
    pure: true,
    effect: false,
    persist: false,
    description: 'Returns the sum of two numbers',
    group: 'custom',
    args: [
      {
        name: 'left',
        type: 'number'
      },
      {
        name: 'right',
        type: 'number'
      }
    ],
    examples: [{ input: '=ADD(1, 2)', output: { type: 'number', result: 3 } }],
    returns: 'number',
    testCases: [],
    chain: true,
    reference: ADD
  }
]
