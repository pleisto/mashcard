import { createFunctionClause } from '../../type'

/**
 * @source
 */
export const spreadsheetSum = createFunctionClause({
  name: 'SUM',
  async: false,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
  description: 'Returns the sum of the column in the spreadsheet.',
  group: 'core',
  args: [{ name: 'column', type: 'Column' }],
  returns: 'number',
  testCases: [],
  chain: true,
  reference: (ctx, { result: column }) => {
    const rows: number[] = column.spreadsheet
      .listRows()
      .map(row => Number(column.spreadsheet.findCellValue({ rowId: row.rowId, columnId: column.columnId }) ?? 0))
    return { type: 'number', result: rows.reduce((a, b) => a + b, 0) }
  }
})
