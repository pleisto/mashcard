import { createFunctionClause } from '../../types'

export const mathInt = createFunctionClause({
  name: 'INT',
  async: false,
  pure: true,
  persist: false,
  lazy: false,
  acceptError: false,
  effect: false,
  description: 'Returns the integer part of a number.',
  group: 'core',
  args: [{ name: 'number', type: 'number' }],
  returns: 'number',
  testCases: [{ input: [1.5], output: { type: 'number', result: 1 } }],
  examples: [{ input: '=INT(-1.5)', output: { type: 'number', result: -1 } }],
  chain: false,
  reference: (ctx, number) => ({
    result: Math.floor(number.result),
    type: 'number'
  })
})
