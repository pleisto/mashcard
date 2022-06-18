import { createFunctionClause } from '../../types'

/**
 * @source
 */
export const mathPi = createFunctionClause({
  name: 'PI',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  description: 'Returns the value of pi.',
  group: 'core',
  args: [],
  returns: 'number',
  testCases: [{ input: [], output: { type: 'number', result: Math.PI } }],
  examples: [{ input: '=PI()', output: { type: 'number', result: Math.PI } }],
  chain: false,
  reference: ctx => ({ result: Math.PI, type: 'number' })
})
