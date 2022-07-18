import { AnyTypeResult, createFunctionClause, FunctionContext } from '../../type'

const XLOOKUP = (
  ctx: FunctionContext,
  { result: lookupValue }: AnyTypeResult<'string'>,
  { result: lookupColumn }: AnyTypeResult<'Column'>,
  { result: returnColumn }: AnyTypeResult<'Column'>,
  notFoundValue: AnyTypeResult<'string'>,
  { result: matchMode }: AnyTypeResult<'number'>
): // eslint-disable-next-line max-params
AnyTypeResult<'string' | 'Error'> => {
  if (lookupColumn.spreadsheetId !== returnColumn.spreadsheetId) {
    return {
      type: 'Error',
      result: { message: 'errors.interpret.spreadsheet.column_same_namespace_check', type: 'runtime' }
    }
  }

  let result: AnyTypeResult<'string'> = notFoundValue

  lookupColumn.spreadsheet.listRows().forEach(row => {
    let bol = false
    const compareData = Number(lookupValue)
    const data = Number(
      lookupColumn.spreadsheet.findCellValue({ rowId: row.rowId, columnId: lookupColumn.columnId }) ?? 0
    )

    switch (matchMode) {
      case 0:
        bol = data === compareData
        break
      case 1:
        bol = data >= compareData
        break
      case 2:
        bol = data <= compareData
        break
    }

    if (bol) {
      result = {
        type: 'string',
        result: lookupColumn.spreadsheet.findCellValue({ rowId: row.rowId, columnId: returnColumn.columnId }) ?? ''
      }
    }
  })

  return result
}

/**
 * @source
 */
export const spreadsheetXlookup = createFunctionClause({
  name: 'XLOOKUP',
  async: false,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'string', result: 'foo' } }],
  description: 'returns the value of the cell in the return column that matches the lookup value in the lookup column',
  group: 'core',
  args: [
    { name: 'lookupValue', type: 'string' },
    { name: 'lookupColumn', type: 'Column' },
    { name: 'returnColumn', type: 'Column' },
    { name: 'notFoundValue', type: 'string', default: { type: 'string', result: '' } },
    { name: 'matchMode', type: 'number', default: { type: 'number', result: 0 } }
  ],
  returns: 'string',
  testCases: [],
  chain: true,
  reference: XLOOKUP
})
