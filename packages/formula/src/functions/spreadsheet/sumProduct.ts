import { ColumnResult, createFunctionClause, ErrorResult, FunctionContext, NumberResult } from '../../type'

const SUMPRODUCT = (
  ctx: FunctionContext,
  { result: column1 }: ColumnResult,
  { result: column2 }: ColumnResult
): NumberResult | ErrorResult => {
  if (column1.spreadsheetId !== column2.spreadsheetId) {
    return { type: 'Error', result: 'Columns must be in the same namespace', meta: 'runtime' }
  }

  let sum: number = 0

  column1.spreadsheet.listRows().forEach(row => {
    const value1 = Number(column1.spreadsheet.findCellValue({ rowId: row.rowId, columnId: column1.columnId }) ?? 0)
    const value2 = Number(column1.spreadsheet.findCellValue({ rowId: row.rowId, columnId: column2.columnId }) ?? 0)
    sum += value1 * value2
  })

  return { type: 'number', result: sum }
}

/**
 * @source
 */
export const spreadsheetSumProduct = createFunctionClause({
  name: 'SUMPRODUCT',
  async: false,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
  description: 'Returns the product sum of the values of the two columns',
  group: 'core',
  args: [
    { name: 'column1', type: 'Column' },
    { name: 'column2', type: 'Column' }
  ],
  returns: 'number',
  testCases: [],
  chain: false,
  reference: SUMPRODUCT
})
