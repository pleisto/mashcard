import { createFunctionClause } from '../../type'

/**
 * @source
 */
export const arrayAverage = createFunctionClause({
  name: 'Average',
  async: false,
  lazy: false,
  persist: false,
  acceptError: false,
  pure: true,
  effect: false,
  description: 'Returns the average of the array.',
  group: 'core',
  args: [{ name: 'array', type: 'Array' }],
  examples: [{ input: '=Average([1,2,3])', output: { type: 'number', result: 2 } }],
  returns: 'number',
  testCases: [
    { input: [[]], output: { type: 'number', result: NaN } },
    { input: [[{ type: 'number', result: 1 }]], output: { type: 'number', result: 1 } }
  ],
  chain: true,
  reference: (ctx, { result }) => {
    return { result: result.map(a => Number(a.result)).reduce((a, b) => a + b, 0) / result.length, type: 'number' }
  }
})
