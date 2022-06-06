import { createFunctionClause } from '../../types'

export const spreadsheetRowCount = createFunctionClause({
  name: 'ROW_COUNT',
  async: false,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
  description: 'Returns the row size of the spreadsheet.',
  group: 'core',
  args: [{ name: 'spreadsheet', type: 'Spreadsheet' }],
  returns: 'number',
  testCases: [],
  chain: true,
  reference: (ctx, spreadsheet) => {
    return { type: 'number', result: spreadsheet.result.rowCount() }
  }
})
