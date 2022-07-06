import { ArrayResult, createFunctionClause, NumberResult, StringResult } from '../../type'

/**
 * @source
 */
export const convertToArray = createFunctionClause({
  name: 'toArray',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'Array', meta: 'void', result: [] } }],
  description: 'Converts the value to an array.',
  group: 'core',
  args: [{ name: 'input', type: ['number', 'Spreadsheet'] }],
  returns: 'Array',
  testCases: [
    {
      input: [3],
      output: {
        type: 'Array',
        meta: 'number',
        result: [
          { type: 'number', result: 0 },
          { type: 'number', result: 1 },
          { type: 'number', result: 2 }
        ]
      }
    }
  ],
  chain: true,
  reference: (ctx, { result, type }) => {
    if (type === 'Spreadsheet')
      return {
        type: 'Array',
        meta: 'Array',
        result: result.toArray().map<ArrayResult>((row: string[]) => ({
          type: 'Array',
          meta: 'string',
          result: row.map<StringResult>(r => ({ type: 'string', result: r }))
        }))
      }

    if (result < 0) {
      return { type: 'Error', result: 'Number should be positive', meta: 'runtime' }
    }
    return {
      type: 'Array',
      meta: 'number',
      result: Array.from(Array(result).keys()).map<NumberResult>(n => ({ type: 'number', result: n }))
    }
  }
})
