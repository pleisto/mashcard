import { createFunctionClause } from '../../types'

/**
 * @source
 */
export const mathFloor = createFunctionClause({
  name: 'FLOOR',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  description: 'Returns the number rounded down to the nearest integer.',
  group: 'core',
  args: [{ name: 'number', type: 'number' }],
  returns: 'number',
  examples: [{ input: '=FLOOR(1.5)', output: { type: 'number', result: 2 } }],
  testCases: [
    { input: [NaN], output: { type: 'number', result: NaN } },
    { input: [1.5], output: { type: 'number', result: 1 } },
    { input: [-1.5], output: { type: 'number', result: -2 } }
  ],
  chain: false,
  reference: (ctx, number) => ({
    result: Math.floor(number.result),
    type: 'number'
  })
})
