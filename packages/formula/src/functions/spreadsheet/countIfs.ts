import { buildPredicate } from '../../grammar'
import { AnyTypeResult, createFunctionClause, FunctionContext, PredicateFunction } from '../../type'

const COUNTIFS = (
  ctx: FunctionContext,
  { result: column }: AnyTypeResult<'Column'>,
  predicate: AnyTypeResult<'Predicate'>
): AnyTypeResult<'number' | 'Error'> => {
  const predicateFunction: PredicateFunction = buildPredicate(predicate)
  let sum: number = 0

  column.spreadsheet.listRows().forEach(row => {
    const value = Number(column.spreadsheet.findCellValue({ rowId: row.rowId, columnId: column.columnId }) ?? 0)
    if (predicateFunction(value)) {
      sum += 1
    }
  })

  return { type: 'number', result: sum }
}

/**
 * @source
 */
export const spreadsheetCountIfs = createFunctionClause({
  name: 'COUNTIFS',
  async: false,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
  description: 'Counts the number of rows that match the predicate',
  group: 'core',
  args: [
    { name: 'column', type: 'Column' },
    { name: 'condition', type: 'Predicate' }
  ],
  returns: 'number',
  testCases: [],
  chain: true,
  reference: COUNTIFS
})
