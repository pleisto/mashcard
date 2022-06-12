import {
  BooleanResult,
  ColumnResult,
  createFunctionClause,
  ErrorResult,
  FunctionContext,
  SpreadsheetResult,
  StringResult
} from '../../types'

const VLOOKUP = (
  ctx: FunctionContext,
  { result: match }: StringResult,
  { result: spreadsheet }: SpreadsheetResult,
  { result: column }: ColumnResult,
  { result: range }: BooleanResult
): // eslint-disable-next-line max-params
StringResult | ErrorResult => {
  if (spreadsheet.spreadsheetId !== column.spreadsheetId) {
    return { type: 'Error', result: 'Column must be in the same namespace', errorKind: 'runtime' }
  }

  const columns = spreadsheet.listColumns()

  const firstColumn = columns[0]
  if (!firstColumn) {
    return { type: 'Error', result: 'Spreadsheet is empty', errorKind: 'runtime' }
  }

  if (firstColumn.columnId === column.columnId) {
    return { type: 'Error', result: 'Column cannot be the same as the first column', errorKind: 'runtime' }
  }

  if (!columns.find(c => c.columnId === column.columnId)) {
    return { type: 'Error', result: 'Column not found', errorKind: 'runtime' }
  }

  let result: StringResult | ErrorResult = { type: 'Error', result: 'Not found', errorKind: 'runtime' }

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

export const spreadsheetVlookup = createFunctionClause({
  name: 'VLOOKUP',
  async: false,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'string', result: 'foo' } }],
  description: 'Returns the value of the column in the spreadsheet that matches the match value.',
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
