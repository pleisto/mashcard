import { createFunctionClause } from '../../types'

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
  testCases: [{ input: [' abc '], output: { type: 'string', result: 'abc' } }],
  chain: true,
  reference: (ctx, str) => ({
    result: str.result.trim(),
    type: 'string'
  })
})
