import { createFunctionClause } from '../../types'

export const convertToArray = createFunctionClause({
  name: 'toArray',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'Array', subType: 'void', result: [] } }],
  description: 'Converts the value to an array.',
  group: 'core',
  args: [{ name: 'input', type: ['number', 'Spreadsheet'] }],
  returns: 'Array',
  testCases: [
    {
      input: [3],
      output: {
        type: 'Array',
        subType: 'number',
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
        subType: 'Array',
        result: result.toArray().map((row: string[]) => ({
          type: 'Array',
          subType: 'string',
          result: row.map(r => ({ type: 'string', result: r }))
        }))
      }

    if (result < 0) {
      return { type: 'Error', result: 'Number should be positive', errorKind: 'runtime' }
    }
    return {
      type: 'Array',
      subType: 'number',
      result: Array.from(Array(result).keys()).map(n => ({ type: 'number', result: n }))
    }
  }
})
