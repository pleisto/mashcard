import {
  FunctionContext,
  BasicFunctionClause,
  NumberResult,
  SpreadsheetResult,
  PredicateResult,
  ErrorResult,
  PredicateFunction,
  buildPredicate
} from '..'

// TODO https://docs.microsoft.com/en-us/powerapps/maker/canvas-apps/functions/function-filter-lookup
// Filter Search LookUp
// https://docs.microsoft.com/en-us/powerapps/maker/canvas-apps/functions/function-clear-collect-clearcollect
// TODO database refactor to collection

export const CountIf = (
  ctx: FunctionContext,
  { result: database }: SpreadsheetResult,
  predicate: PredicateResult
): NumberResult | ErrorResult => {
  const column = predicate.column
  if (!column) {
    return { type: 'Error', result: 'Column is missing', errorKind: 'runtime' }
  }

  if (database.blockId !== column.namespaceId) {
    return { type: 'Error', result: 'Column must be in the same namespace', errorKind: 'runtime' }
  }
  const columns = database.listColumns()

  if (!columns.find(c => c.columnId === column.columnId)) {
    return { type: 'Error', result: 'Column not found', errorKind: 'runtime' }
  }

  const predicateFunction: PredicateFunction = buildPredicate(predicate)
  let sum: number = 0

  database.listRows().forEach(row => {
    const value = Number(row[column.columnId])
    if (predicateFunction(value)) {
      sum += 1
    }
  })

  return { result: sum, type: 'number' }
}

export const CORE_POWERFX_CLAUSES: Array<BasicFunctionClause<'number'>> = [
  {
    name: 'CountIf',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=CountIf()', output: { type: 'number', result: 123 } }],
    description: 'Returns the sum of the column in the database.',
    group: 'core',
    args: [
      {
        name: 'database',
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
