import {
  FunctionContext,
  BaseFunctionClause,
  NumberResult,
  SpreadsheetResult,
  PredicateResult,
  ErrorResult,
  PredicateFunction
} from '../types'
import { buildPredicate } from '../grammar/lambda'

// TODO https://docs.microsoft.com/en-us/powerapps/maker/canvas-apps/functions/function-filter-lookup
// Filter Search LookUp
// https://docs.microsoft.com/en-us/powerapps/maker/canvas-apps/functions/function-clear-collect-clearcollect
// TODO spreadsheet refactor to collection

export const CountIf = (
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

export const CORE_POWERFX_CLAUSES: Array<BaseFunctionClause<'number'>> = [
  {
    name: 'CountIf',
    async: false,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=CountIf()', output: { type: 'number', result: 123 } }],
    description: 'Returns the sum of the column in the spreadsheet.',
    group: 'core',
    args: [
      {
        name: 'spreadsheet',
        type: 'Spreadsheet'
      },
      {
        name: 'predicate',
        type: 'Predicate'
      }
    ],
    testCases: [],
    returns: 'number',
    chain: false,
    reference: CountIf
  }
]
