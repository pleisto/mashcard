import axios from 'axios'
import { castData } from '../../grammar'
import { createFunctionClause } from '../../types'

export const requestGet = createFunctionClause({
  name: 'GET',
  async: true,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: true,
  examples: [{ input: '=REQUEST_GET(10)', output: { type: 'Record', result: {}, subType: 'void' } }],
  description: 'request get',
  group: 'request',
  args: [{ type: 'string', name: 'url' }],
  testCases: [],
  returns: 'Record',
  chain: false,
  reference: async (ctx, { result: url }) => {
    if (!url) return { type: 'Error', result: 'URL is blank', errorKind: 'runtime' }
    const response = await axios.get(url)
    return castData(response)
  }
})
