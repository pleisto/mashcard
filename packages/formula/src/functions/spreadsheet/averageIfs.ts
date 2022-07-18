import { buildPredicate } from '../../grammar'
import { AnyTypeResult, createFunctionClause, FunctionContext, PredicateFunction } from '../../type'

const AVERAGEIFS = (
  ctx: FunctionContext,
  { result: column1 }: AnyTypeResult<'Column'>,
  { result: column2 }: AnyTypeResult<'Column'>,
  predicate: AnyTypeResult<'Predicate'>
): AnyTypeResult<'number' | 'Error'> => {
  if (column1.spreadsheetId !== column2.spreadsheetId) {
    return { type: 'Error', result: { message: 'Columns must be in the same namespace', type: 'runtime' } }
  }

  const predicateFunction: PredicateFunction = buildPredicate(predicate)
  let sum: number = 0
  let count: number = 0

  column1.spreadsheet.listRows().forEach(row => {
    const value1 = Number(column1.spreadsheet.findCellValue({ rowId: row.rowId, columnId: column1.columnId }) ?? 0)
    const value2 = Number(column1.spreadsheet.findCellValue({ rowId: row.rowId, columnId: column2.columnId }) ?? 0)
    if (value1 && predicateFunction(value2)) {
      count += 1
      sum += value1
    }
  })

  if (count === 0) {
    return { type: 'Error', result: { message: 'No matching values', type: 'runtime' } }
  }

  return { type: 'number', result: sum / count }
}

/**
 * @source
 */
export const spreadsheetAverageIfs = createFunctionClause({
  name: 'AVERAGEIFS',
  async: false,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
  description: 'Returns the average of the values of the two columns that match the predicate',
  group: 'core',
  args: [
    { name: 'column1', type: 'Column' },
    { name: 'column2', type: 'Column' },
    { name: 'condition', type: 'Predicate' }
  ],
  returns: 'number',
  testCases: [],
  chain: false,
  reference: AVERAGEIFS
})
