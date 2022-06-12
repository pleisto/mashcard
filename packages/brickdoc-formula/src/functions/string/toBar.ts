import { createFunctionClause } from '../../types'

export const stringToBar = createFunctionClause({
  name: 'toBar',
  async: false,
  lazy: false,
  persist: false,
  acceptError: false,
  pure: true,
  effect: false,
  description: 'Converts a record to a bar',
  group: 'core',
  args: [{ name: 'record', type: 'Record' }],
  examples: [{ input: '=toBar({})', output: { type: 'Record', subType: 'void', result: {} } }],
  returns: 'Record',
  testCases: [],
  chain: true,
  reference: (ctx, record) => {
    return { ...record, view: { type: 'bar', attrs: {} } }
  }
})
