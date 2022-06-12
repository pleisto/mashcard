import { createFunctionClause } from '../../types'

export const dateDate = createFunctionClause({
  name: 'DATE',
  async: false,
  pure: true,
  persist: false,
  lazy: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=DATE("1926-08-17")', output: { type: 'Date', result: new Date('1926-08-17') } }],
  description: 'Returns the date specified by the input',
  group: 'core',
  args: [{ name: 'input', type: 'string' }],
  testCases: [{ input: ['1926-08-17'], output: { type: 'Date', result: new Date('1926-08-17') } }],
  returns: 'Date',
  chain: false,
  reference: (ctx, string) => ({ result: new Date(string.result), type: 'Date' })
})
