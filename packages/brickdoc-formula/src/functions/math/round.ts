import { createFunctionClause } from '../../types'

/**
 * @source
 */
export const mathRound = createFunctionClause({
  name: 'ROUND',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  description: 'Returns the number rounded to the specified number of decimal places.',
  group: 'core',
  args: [{ name: 'number', type: 'number' }],
  returns: 'number',
  examples: [{ input: '=ROUND(1.5)', output: { type: 'number', result: 2 } }],
  testCases: [{ input: [NaN], output: { type: 'number', result: NaN } }],
  chain: false,
  reference: (ctx, number) => ({
    result: Math.round(number.result),
    type: 'number'
  })
})
