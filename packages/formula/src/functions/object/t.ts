import { createFunctionClause, FORMULA_USED_TYPES } from '../../type'

/**
 * @source
 */
export const objectT = createFunctionClause({
  name: 'T',
  async: false,
  pure: true,
  lazy: false,
  acceptError: true,
  effect: false,
  persist: false,
  description: 'Returns current object',
  group: 'core',
  chain: true,
  args: [{ name: 'obj', type: [...FORMULA_USED_TYPES] }],
  returns: FORMULA_USED_TYPES,
  testCases: [
    { input: ['abc'], output: { type: 'string', result: 'abc' } },
    { input: [false], output: { type: 'boolean', result: false } },
    { input: [123], output: { type: 'number', result: 123 } }
  ],
  examples: [{ input: '=T(123)', output: { type: 'number', result: 123 } }],
  reference: (ctx, obj) => obj
})
