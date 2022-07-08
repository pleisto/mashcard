import axios from 'axios'
import { castData } from '../../grammar'
import { createFunctionClause } from '../../type'

/**
 * @source
 */
export const requestGet = createFunctionClause({
  name: 'GET',
  async: true,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: true,
  examples: [{ input: '=REQUEST_GET(10)', output: { type: 'Record', result: {}, meta: 'void' } }],
  description: 'request get',
  group: 'request',
  args: [{ type: 'string', name: 'url' }],
  testCases: [],
  returns: 'Record',
  chain: false,
  reference: async (ctx, { result: url }) => {
    if (!url) return { type: 'Error', result: 'URL is blank', meta: 'runtime' }
    const response = await axios.get(url)
    return castData(response)
  }
})
