import { AnyTypeResult, createFunctionClause, FunctionContext } from '../../type'

const VLOOKUP = (
  ctx: FunctionContext,
  { result: match }: AnyTypeResult<'string'>,
  { result: spreadsheet }: AnyTypeResult<'Spreadsheet'>,
  { result: column }: AnyTypeResult<'Column'>,
  { result: range }: AnyTypeResult<'boolean'>
): // eslint-disable-next-line max-params
AnyTypeResult<'string' | 'Error'> => {
  if (spreadsheet.spreadsheetId !== column.spreadsheetId) {
    return {
      type: 'Error',
      result: { message: 'errors.interpret.spreadsheet.column_same_namespace_check', type: 'runtime' }
    }
  }

  const columns = spreadsheet.listColumns()

  const firstColumn = columns[0]
  if (!firstColumn) {
    return { type: 'Error', result: { message: 'errors.interpret.spreadsheet.empty', type: 'runtime' } }
  }

  if (firstColumn.columnId === column.columnId) {
    return { type: 'Error', result: { message: 'Column cannot be the same as the first column', type: 'runtime' } }
  }

  if (!columns.find(c => c.columnId === column.columnId)) {
    return { type: 'Error', result: { message: 'errors.interpret.not_found.column', type: 'runtime' } }
  }

  let result: AnyTypeResult<'Error' | 'string'> = { type: 'Error', result: { message: 'Not found', type: 'runtime' } }

  const matchData = String(match)

  spreadsheet.listRows().forEach(row => {
    const firstCellValue = spreadsheet.findCellValue({
      rowId: row.rowId,
      columnId: firstColumn.columnId
    })
    const bol = range ? Number(firstCellValue) <= Number(matchData) : firstCellValue === matchData

    if (bol) {
      result = {
        type: 'string',
        result: spreadsheet.findCellValue({ rowId: row.rowId, columnId: column.columnId }) ?? ''
      }
    }
  })

  return result
}

/**
 * @source
 */
export const spreadsheetVlookup = createFunctionClause({
  name: 'VLOOKUP',
  async: false,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'string', result: 'foo' } }],
  description: 'Finds the value of the first row that matches the match value',
  group: 'core',
  args: [
    { name: 'match', type: 'string' },
    { name: 'spreadsheet', type: 'Spreadsheet' },
    { name: 'column', type: 'Column' },
    { name: 'range', type: 'boolean', default: { type: 'boolean', result: true } }
  ],
  returns: 'string',
  testCases: [],
  chain: true,
  reference: VLOOKUP
})
