import { createFunctionClause } from '../../types'

/**
 * @source
 */
export const spreadsheetMax = createFunctionClause({
  name: 'MAX',
  async: false,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
  description: 'Returns the max of the column in the spreadsheet.',
  group: 'core',
  args: [{ name: 'column', type: 'Column' }],
  returns: 'number',
  testCases: [],
  chain: true,
  reference: (ctx, { result: column }) => {
    const rows: number[] = column.spreadsheet
      .listRows()
      .map(row => Number(column.spreadsheet.findCellValue({ rowId: row.rowId, columnId: column.columnId }) ?? 0))
    return { type: 'number', result: Math.max(...rows) }
  }
})