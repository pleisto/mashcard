import { createFunctionClause } from '../../types'

/**
 * @source
 */
export const dateNow = createFunctionClause({
  name: 'NOW',
  async: false,
  pure: false,
  persist: false,
  lazy: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=NOW()', output: { type: 'Date', result: new Date('1926-08-17T00:00:00.000Z') } }],
  description: 'Returns the current date',
  group: 'core',
  args: [],
  testCases: [],
  returns: 'Date',
  chain: false,
  reference: ctx => ({ result: new Date(), type: 'Date' })
})
