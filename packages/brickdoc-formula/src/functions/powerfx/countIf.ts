import { buildPredicate } from '../../grammar'
import {
  FunctionContext,
  SpreadsheetResult,
  PredicateResult,
  NumberResult,
  ErrorResult,
  PredicateFunction,
  createFunctionClause
} from '../../types'

const CountIf = (
  ctx: FunctionContext,
  { result: spreadsheet }: SpreadsheetResult,
  predicate: PredicateResult
): NumberResult | ErrorResult => {
  const column = predicate.column
  if (!column) {
    return { type: 'Error', result: 'Column is missing', errorKind: 'runtime' }
  }

  if (spreadsheet.spreadsheetId !== column.spreadsheetId) {
    return { type: 'Error', result: 'Column must be in the same namespace', errorKind: 'runtime' }
  }
  const columns = spreadsheet.listColumns()

  if (!columns.find(c => c.columnId === column.columnId)) {
    return { type: 'Error', result: 'Column not found', errorKind: 'runtime' }
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
