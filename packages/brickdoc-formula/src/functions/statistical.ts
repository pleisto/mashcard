import { ContextInterface, BaseFunctionClause, NumberResult } from '..'

export const AVERAGE = (ctx: ContextInterface, ...numbers: number[]): NumberResult => {
  const sum = numbers.reduce((acc, cur) => acc + cur, 0)
  return { type: 'number', result: sum / numbers.length }
}

export const CORE_STATISTICAL_CLAUSES: Array<BaseFunctionClause<'number'>> = [
  {
    name: 'AVERAGE',
    async: false,
    pure: true,
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
    returns: 'number',
    examples: [
      {
        input: [-1, 0, 4],
        output: 1
      },
      {
        input: [],
        output: NaN
      }
    ],
    chain: false,
    reference: AVERAGE
  }
]
