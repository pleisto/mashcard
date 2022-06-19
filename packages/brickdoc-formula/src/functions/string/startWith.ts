import { createFunctionClause } from '../../types'

/**
 * @source
 */
export const stringStartWith = createFunctionClause({
  name: 'START_WITH',
  async: false,
  lazy: false,
  persist: false,
  acceptError: false,
  pure: true,
  effect: false,
  description: 'Returns true if the sequence of elements of searchString converted to a String',
  group: 'core',
  args: [
    { name: 'string', type: 'string' },
    { name: 'prefix', type: 'string' }
  ],
  examples: [
    { input: '=START_WITH("foo", "bar")', output: { type: 'boolean', result: false } },
    { input: '=START_WITH("foobar", "foo")', output: { type: 'boolean', result: true } }
  ],
  returns: 'boolean',
  testCases: [
    { input: ['foobar', 'foo'], output: { type: 'boolean', result: true } },
    { input: ['', ''], output: { type: 'boolean', result: true } }
  ],
  chain: true,
  reference: (ctx, string, prefix) => ({
    result: string.result.startsWith(prefix.result),
    type: 'boolean'
  })
})
