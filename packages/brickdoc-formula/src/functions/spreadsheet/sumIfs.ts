import { buildPredicate } from '../../grammar'
import {
  ColumnResult,
  createFunctionClause,
  ErrorResult,
  FunctionContext,
  NumberResult,
  PredicateFunction,
  PredicateResult
} from '../../types'

const SUMIFS = (
  ctx: FunctionContext,
  { result: column1 }: ColumnResult,
  { result: column2 }: ColumnResult,
  predicate: PredicateResult
): NumberResult | ErrorResult => {
  if (column1.spreadsheetId !== column2.spreadsheetId) {
    return { type: 'Error', result: 'Columns must be in the same namespace', errorKind: 'runtime' }
  }

  const predicateFunction: PredicateFunction = buildPredicate(predicate)
  let sum: number = 0

  column1.spreadsheet.listRows().forEach(row => {
    const value1 = Number(column1.spreadsheet.findCellValue({ rowId: row.rowId, columnId: column1.columnId }) ?? 0)
    const value2 = Number(column1.spreadsheet.findCellValue({ rowId: row.rowId, columnId: column2.columnId }) ?? 0)
    if (value1 && predicateFunction(value2)) {
      sum += value1
    }
  })

  return { type: 'number', result: sum }
}

/**
 * @source
 */
export const spreadsheetSumIfs = createFunctionClause({
  name: 'SUMIFS',
  async: false,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
  description: 'Returns the sum of the values of the two columns that match the predicate',
  group: 'core',
  args: [
    { name: 'column1', type: 'Column' },
    { name: 'column2', type: 'Column' },
    { name: 'condition', type: 'Predicate' }
  ],
  returns: 'number',
  testCases: [],
  chain: false,
  reference: SUMIFS
})
