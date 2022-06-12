import { createFunctionClause } from '../../types'

export const mathAbs = createFunctionClause({
  name: 'ABS',
  async: false,
  pure: true,
  persist: false,
  lazy: false,
  acceptError: false,
  effect: false,
  description: 'Returns the absolute value of a number.',
  group: 'core',
  args: [{ name: 'number', type: 'number' }],
  returns: 'number',
  testCases: [{ input: [-1], output: { type: 'number', result: 1 } }],
  examples: [{ input: '=ABS(-1)', output: { type: 'number', result: 1 } }],
  chain: false,
  reference: (ctx, number) => ({
    result: Math.abs(number.result),
    type: 'number'
  })
})
