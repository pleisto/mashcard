import { createFunctionClause } from '../../types'

/**
 * @source
 */
export const mathRand = createFunctionClause({
  name: 'RAND',
  async: false,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  description: 'Returns a random number between 0 and 1.',
  group: 'core',
  args: [],
  examples: [{ input: '=RAND()', output: { type: 'number', result: 0.513 } }],
  returns: 'number',
  testCases: [],
  chain: false,
  reference: ctx => ({ result: Math.random(), type: 'number' })
})
