import { createFunctionClause } from '../../types'

/**
 * @source
 */
export const arraySum = createFunctionClause({
  name: 'Sum',
  async: false,
  lazy: false,
  persist: false,
  acceptError: false,
  pure: true,
  effect: false,
  description: 'Returns the sum of the array.',
  group: 'core',
  args: [{ name: 'array', type: 'Array' }],
  examples: [{ input: '=SUM([1,2,3])', output: { type: 'number', result: 6 } }],
  returns: 'number',
  testCases: [
    { input: [[]], output: { type: 'number', result: 0 } },
    {
      input: [
        [
          { type: 'number', result: 1 },
          { type: 'number', result: 2 }
        ]
      ],
      output: { type: 'number', result: 3 }
    }
  ],
  chain: true,
  reference: (ctx, { result }) => {
    return { result: result.map(a => Number(a.result)).reduce((a, b) => a + b, 0), type: 'number' }
  }
})
