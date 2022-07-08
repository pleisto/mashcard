import { createFunctionClause } from '../../type'

/**
 * @source
 */
export const mathLn = createFunctionClause({
  name: 'LN',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  description: 'Returns the natural logarithm of a number.',
  group: 'core',
  args: [{ name: 'number', type: 'number' }],
  returns: 'number',
  examples: [{ input: '=LN(100)', output: { type: 'number', result: 4.605170185988092 } }],
  testCases: [{ input: [NaN], output: { type: 'number', result: NaN } }],
  chain: false,
  reference: (ctx, number) => ({
    result: Math.log(number.result),
    type: 'number'
  })
})
