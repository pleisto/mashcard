import { createFunctionClause } from '../../type'

/**
 * @source
 */
export const mathPower = createFunctionClause({
  name: 'POWER',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  description: 'Returns the value of a number raised to a power.',
  group: 'core',
  args: [
    { name: 'number', type: 'number' },
    { name: 'power', type: 'number' }
  ],
  returns: 'number',
  testCases: [
    { input: [1, NaN], output: { type: 'number', result: NaN } },
    { input: [NaN, 1], output: { type: 'number', result: NaN } },
    { input: [2, 3], output: { type: 'number', result: 8 } }
  ],
  examples: [{ input: '=POWER(2,3)', output: { type: 'number', result: 8 } }],
  chain: false,
  reference: (ctx, number, power) => ({
    result: Math.pow(number.result, power.result),
    type: 'number'
  })
})
