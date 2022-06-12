import { createFunctionClause } from '../../types'

export const stringSplit = createFunctionClause({
  name: 'Split',
  async: false,
  lazy: false,
  acceptError: false,
  pure: true,
  persist: false,
  effect: false,
  description: 'Returns an array of strings that result from splitting the string at the given separator.',
  group: 'core',
  args: [
    { name: 'string', type: 'string' },
    { name: 'separator', type: 'string', default: { type: 'string', result: '' } }
  ],
  examples: [
    {
      input: '=Split("foo", ",")',
      output: { type: 'Array', subType: 'string', result: [{ type: 'string', result: 'foo' }] }
    }
  ],
  returns: 'Array',
  testCases: [],
  chain: true,
  reference: (ctx, string, separator) => ({
    result: string.result.split(separator.result).map(s => ({ result: s, type: 'string' })),
    subType: 'string',
    type: 'Array'
  })
})
