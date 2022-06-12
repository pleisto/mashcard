import { createFunctionClause } from '../../types'

export const convertToBoolean = createFunctionClause({
  name: 'toBoolean',
  async: false,
  lazy: false,
  persist: false,
  acceptError: false,
  pure: true,
  effect: false,
  description: 'Converts a string to a boolean',
  group: 'core',
  args: [{ name: 'string', type: 'string' }],
  examples: [
    { input: '=toBoolean("true")', output: { type: 'boolean', result: true } },
    { input: '=toBoolean("False")', output: { type: 'boolean', result: false } }
  ],
  returns: 'boolean',
  testCases: [
    { input: ['true'], output: { type: 'boolean', result: true } },
    { input: ['false'], output: { type: 'boolean', result: false } }
  ],
  chain: true,
  reference: (ctx, string) => {
    const result = string.result.toUpperCase() === 'TRUE'
    return { type: 'boolean', result }
  }
})
