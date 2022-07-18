import { buildPredicate } from '../../grammar'
import { FunctionContext, PredicateFunction, createFunctionClause, AnyTypeResult } from '../../type'

const CountIf = (
  ctx: FunctionContext,
  { result: spreadsheet }: AnyTypeResult<'Spreadsheet'>,
  predicate: AnyTypeResult<'Predicate'>
): AnyTypeResult<'number' | 'Error'> => {
  const column = predicate.meta.column
  if (!column) {
    return { type: 'Error', result: { message: 'Column is missing', type: 'runtime' } }
  }

  if (spreadsheet.spreadsheetId !== column.spreadsheetId) {
    return {
      type: 'Error',
      result: { message: 'errors.interpret.spreadsheet.column_same_namespace_check', type: 'runtime' }
    }
  }
  const columns = spreadsheet.listColumns()

  if (!columns.find(c => c.columnId === column.columnId)) {
    return { type: 'Error', result: { message: 'errors.interpret.not_found.column', type: 'runtime' } }
  }

  const predicateFunction: PredicateFunction = buildPredicate(predicate)
  let sum: number = 0

  spreadsheet.listRows().forEach(row => {
    const value = Number(spreadsheet.findCellValue({ rowId: row.rowId, columnId: column.columnId }) ?? 0)
    if (predicateFunction(value)) {
      sum += 1
    }
  })

  return { result: sum, type: 'number' }
}

/**
 * @source
 */
export const powerfxCountIf = createFunctionClause({
  name: 'CountIf',
  async: false,
  pure: false,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=CountIf()', output: { type: 'number', result: 123 } }],
  description: 'Counts the number of rows that match the predicate',
  group: 'core',
  args: [
    { name: 'spreadsheet', type: 'Spreadsheet' },
    { name: 'predicate', type: 'Predicate' }
  ],
  testCases: [],
  returns: 'number',
  chain: false,
  reference: CountIf
})
