import { AnyTypeResult, createFunctionClause } from '../../type'

/**
 * @source
 */
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
      output: { type: 'Array', meta: 'string', result: [{ type: 'string', result: 'foo' }] }
    }
  ],
  returns: 'Array',
  testCases: [
    { input: ['', ';;'], output: { type: 'Array', meta: 'string', result: [{ type: 'string', result: '' }] } },
    { input: ['a;b', ';;'], output: { type: 'Array', meta: 'string', result: [{ type: 'string', result: 'a;b' }] } },
    {
      input: ['a;;b', ';;'],
      output: {
        type: 'Array',
        meta: 'string',
        result: [
          { type: 'string', result: 'a' },
          { type: 'string', result: 'b' }
        ]
      }
    }
  ],
  chain: true,
  reference: (ctx, string, separator) => ({
    result: string.result.split(separator.result).map<AnyTypeResult<'string'>>(s => ({ result: s, type: 'string' })),
    meta: 'string',
    type: 'Array'
  })
})
