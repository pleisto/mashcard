import { sleep } from '@mashcard/active-support'
import { createFunctionClause } from '../../type'

/**
 * @source
 */
export const processSleep = createFunctionClause({
  name: 'SLEEP',
  async: true,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=SLEEP(10)', output: { type: 'number', result: 10 } }],
  description: 'Sleep for a given number of milliseconds',
  group: 'core',
  args: [
    {
      type: 'number',
      name: 'number'
    }
  ],
  testCases: [],
  returns: 'number',
  chain: false,
  reference: async (ctx, number) => {
    await sleep(number.result).promise
    return number
  }
})
