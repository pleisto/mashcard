import { createFunctionClause } from '../../types'

/**
 * @source
 */
export const stringTrim = createFunctionClause({
  name: 'TRIM',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  description: 'Returns the string with leading and trailing whitespace removed.',
  group: 'core',
  examples: [{ input: '=TRIM("  foo  ")', output: { type: 'string', result: 'foo' } }],
  args: [{ name: 'str', type: 'string' }],
  returns: 'string',
  testCases: [
    { input: [''], output: { type: 'string', result: '' } },
    { input: [' \n '], output: { type: 'string', result: '' } },
    { input: [' abc\n '], output: { type: 'string', result: 'abc' } }
  ],
  chain: true,
  reference: (ctx, str) => ({
    result: str.result.trim(),
    type: 'string'
  })
})
