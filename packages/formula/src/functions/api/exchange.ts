import axios from 'axios'
import { castData } from '../../grammar'
import { AnyTypeResult, createFunctionClause } from '../../type'

/**
 * @source
 */
export const apiExchange = createFunctionClause({
  name: 'EXCHANGE',
  async: true,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: true,
  examples: [{ input: '=EXCHANGE(10)', output: { type: 'Record', result: {}, meta: 'void' } }],
  description: 'Get exchange data',
  group: 'core',
  args: [{ type: 'string', name: 'url' }],
  testCases: [],
  returns: 'Record',
  chain: false,
  reference: async (ctx, { result: code }) => {
    if (!code) return { type: 'Error', result: 'CODE is blank', meta: 'runtime' }
    // TODO config secret
    const { data } = await axios.get(`https://v6.exchangerate-api.com/v6/3648761394fd50008e3c3e31/latest/${code}`)
    return castData(data.conversion_rates) as AnyTypeResult<'Record'>
  }
})
