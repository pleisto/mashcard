import { ContextInterface, FunctionClause } from '../..'

export const AVERAGE = (ctx: ContextInterface, ...numbers: number[]): number => {
  const sum = numbers.reduce((acc, cur) => acc + cur, 0)
  return sum / numbers.length
}

export const STATISTICAL_CLAUSES: FunctionClause[] = [
  {
    name: 'AVERAGE',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the average of the numbers in the list.',
    group: 'excel',
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
