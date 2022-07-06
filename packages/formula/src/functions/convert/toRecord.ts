import { createFunctionClause } from '../../types'

/**
 * @source
 */
export const convertToRecord = createFunctionClause({
  name: 'toRecord',
  async: false,
  lazy: false,
  persist: false,
  acceptError: false,
  pure: true,
  effect: false,
  description: 'Converts the Date to a record.',
  group: 'core',
  args: [{ name: 'input', type: 'Date' }],
  examples: [
    {
      input: '=toRecord(new Date())',
      output: {
        type: 'Record',
        meta: 'number',
        result: {
          month: { type: 'number', result: 0 },
          hour: { type: 'number', result: 0 },
          minutes: { type: 'number', result: 0 },
          seconds: { type: 'number', result: 0 },
          day: { type: 'number', result: 1 },
          year: { type: 'number', result: 1970 }
        }
      }
    }
  ],
  returns: 'Record',
  testCases: [],
  chain: true,
  reference: (ctx, { result: date }) => {
    return {
      type: 'Record',
      meta: 'number',
      result: {
        month: { type: 'number', result: date.getMonth() },
        hour: { type: 'number', result: date.getHours() },
        minutes: { type: 'number', result: date.getMinutes() },
        seconds: { type: 'number', result: date.getSeconds() },
        day: { type: 'number', result: date.getDate() },
        year: { type: 'number', result: date.getFullYear() }
      }
    }
  }
})
