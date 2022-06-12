import { createFunctionClause } from '../../types'

export const spreadsheetCountA = createFunctionClause({
  name: 'COUNTA',
  async: false,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
  description: 'Returns the count of the column in the spreadsheet.',
  group: 'core',
  args: [
    {
      name: 'column',
      type: 'Column'
    }
  ],
  returns: 'number',
  testCases: [],
  chain: true,
  reference: (ctx, { result: column }) => {
    const counta = column.spreadsheet
      .listRows()
      .filter(row => !!column.spreadsheet.findCellValue({ rowId: row.rowId, columnId: column.columnId })).length
    return { type: 'number', result: counta }
  }
})
