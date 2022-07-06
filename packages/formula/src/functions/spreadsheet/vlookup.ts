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
    return { type: 'Error', result: 'Column must be in the same namespace', meta: 'runtime' }
  }

  const columns = spreadsheet.listColumns()

  const firstColumn = columns[0]
  if (!firstColumn) {
    return { type: 'Error', result: 'Spreadsheet is empty', meta: 'runtime' }
  }

  if (firstColumn.columnId === column.columnId) {
    return { type: 'Error', result: 'Column cannot be the same as the first column', meta: 'runtime' }
  }

  if (!columns.find(c => c.columnId === column.columnId)) {
    return { type: 'Error', result: 'Column not found', meta: 'runtime' }
  }

  let result: AnyTypeResult<'Error' | 'string'> = { type: 'Error', result: 'Not found', meta: 'runtime' }

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
