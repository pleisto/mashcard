import { createFunctionClause } from '../../types'

export const mathTrunc = createFunctionClause({
  name: 'TRUNC',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  description: 'Returns the integer part of a number.',
  group: 'core',
  args: [{ name: 'number', type: 'number' }],
  returns: 'number',
  examples: [{ input: '=TRUNC(1.5)', output: { type: 'number', result: 1 } }],
  testCases: [],
  chain: false,
  reference: (ctx, number) => ({
    result: Math.trunc(number.result),
    type: 'number'
  })
})
