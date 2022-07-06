import { createFunctionClause } from '../../type'

/**
 * @source
 */
export const mathLog10 = createFunctionClause({
  name: 'LOG10',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  description: 'Returns the base-10 logarithm of a number.',
  group: 'core',
  args: [{ name: 'number', type: 'number' }],
  returns: 'number',
  testCases: [
    { input: [NaN], output: { type: 'number', result: NaN } },
    { input: [100], output: { type: 'number', result: 2 } }
  ],
  examples: [{ input: '=LOG10(100)', output: { type: 'number', result: 2 } }],
  chain: false,
  reference: (ctx, number) => ({ result: Math.log10(number.result), type: 'number' })
})
