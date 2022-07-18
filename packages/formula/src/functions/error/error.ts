import { createFunctionClause } from '../../type'

/**
 * @source
 */
export const errorError = createFunctionClause({
  name: 'ERROR',
  async: false,
  pure: true,
  persist: false,
  lazy: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=ERROR("foo bar")', output: { type: 'Error', result: { message: 'foo bar', type: 'custom' } } }],
  description: 'Returns an error with the given message.',
  group: 'core',
  args: [{ name: 'reason', type: 'string' }],
  testCases: [{ input: ['foo bar'], output: { type: 'Error', result: { message: 'foo bar', type: 'custom' } } }],
  returns: 'Error',
  chain: true,
  reference: (ctx, reason) => ({ result: { message: reason.result, type: 'custom' }, type: 'Error' })
})
