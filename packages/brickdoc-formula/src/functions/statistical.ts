import { FunctionContext, BasicFunctionClause, NumberResult } from '../types'

export const AVERAGE = (ctx: FunctionContext, ...numbers: NumberResult[]): NumberResult => {
  const sum = numbers.map(number => number.result).reduce((acc, cur) => acc + cur, 0)
  return { type: 'number', result: sum / numbers.length }
}

export const SUM = (ctx: FunctionContext, ...numbers: NumberResult[]): NumberResult => {
  const sum = numbers.map(number => number.result).reduce((acc, cur) => acc + cur, 0)
  return { type: 'number', result: sum }
}

export const CORE_STATISTICAL_CLAUSES: Array<BasicFunctionClause<'number'>> = [
  {
    name: 'AVERAGE',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the average of the numbers in the list.',
    group: 'core',
    args: [
      {
        name: 'numbers',
        type: 'number',
        spread: true
      }
    ],
    examples: [{ input: '=AVERAGE(-1, 0, 4)', output: { type: 'number', result: 1 } }],
    returns: 'number',
    testCases: [
      {
        input: [
          { type: 'number', result: -1 },
          { type: 'number', result: 0 },
          { type: 'number', result: 4 }
        ],
        output: 1
      },
      {
        input: [],
        output: NaN
      }
    ],
    chain: false,
    reference: AVERAGE
  },
  {
    name: 'SUM1',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the sum of the numbers in the list.',
    group: 'core',
    args: [
      {
        name: 'numbers',
        type: 'number',
        spread: true
      }
    ],
    examples: [{ input: '=SUM(-1, 0, 4)', output: { type: 'number', result: 3 } }],
    returns: 'number',
    testCases: [],
    chain: false,
    reference: SUM
  }
]
