import { createFunctionClause } from '../../types'

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
  examples: [{ input: '=ERROR("foo bar")', output: { type: 'string', result: 'foo bar' } }],
  description: 'Returns an error with the given message.',
  group: 'core',
  args: [{ name: 'reason', type: 'string' }],
  testCases: [{ input: ['foo bar'], output: { type: 'Error', result: 'foo bar', errorKind: 'custom' } }],
  returns: 'Error',
  chain: true,
  reference: (ctx, reason) => ({
    result: reason.result,
    type: 'Error',
    errorKind: 'custom'
  })
})
