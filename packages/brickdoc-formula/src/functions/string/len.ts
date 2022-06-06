import { createFunctionClause } from '../../types'

export const stringLen = createFunctionClause({
  name: 'LEN',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  description: 'Returns the length of the string.',
  group: 'core',
  args: [{ name: 'str', type: 'string' }],
  returns: 'number',
  testCases: [{ input: ['abc'], output: { type: 'number', result: 3 } }],
  examples: [{ input: '=LEN("foo")', output: { type: 'number', result: 3 } }],
  chain: false,
  reference: (ctx, str) => ({
    result: str.result.length,
    type: 'number'
  })
})
