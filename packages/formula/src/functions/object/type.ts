import { createFunctionClause, FORMULA_USED_TYPES } from '../../types'

/**
 * @source
 */
export const objectType = createFunctionClause({
  name: 'TYPE',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: true,
  effect: false,
  description: 'Returns type of current object',
  group: 'core',
  args: [{ name: 'obj', type: [...FORMULA_USED_TYPES] }],
  returns: 'string',
  testCases: [],
  examples: [
    { input: '=TYPE(100)', output: { type: 'string', result: 'number' } },
    { input: '=TYPE("foo")', output: { type: 'string', result: 'string' } }
  ],
  chain: true,
  reference: (ctx, obj) => ({ result: obj.type, type: 'string' })
})
