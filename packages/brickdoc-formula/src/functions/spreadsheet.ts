/* eslint-disable max-params */
import {
  FunctionContext,
  BaseFunctionClause,
  NumberResult,
  ColumnResult,
  SpreadsheetResult,
  ErrorResult,
  PredicateResult,
  PredicateFunction,
  StringResult,
  AnyTypeResult,
  BooleanResult
} from '../types'
import { buildPredicate } from '../grammar/lambda'

export const SUM = (ctx: FunctionContext, { result: column }: ColumnResult): NumberResult | ErrorResult => {
  const rows: number[] = column.spreadsheet
    .listRows()
    .map(row =>
      Number(column.spreadsheet.findCellDisplayData({ rowId: row.rowId, columnId: column.columnId })?.display ?? 0)
    )
  return { type: 'number', result: rows.reduce((a, b) => a + b, 0) }
}

export const MAX = (ctx: FunctionContext, { result: column }: ColumnResult): NumberResult | ErrorResult => {
  const rows: number[] = column.spreadsheet
    .listRows()
    .map(row =>
      Number(column.spreadsheet.findCellDisplayData({ rowId: row.rowId, columnId: column.columnId })?.display ?? 0)
    )
  return { type: 'number', result: Math.max(...rows) }
}

export const COUNTA = (ctx: FunctionContext, { result: column }: ColumnResult): NumberResult | ErrorResult => {
  const counta = column.spreadsheet
    .listRows()
    .filter(
      row => !!column.spreadsheet.findCellDisplayData({ rowId: row.rowId, columnId: column.columnId })?.display
    ).length
  return { type: 'number', result: counta }
}

export const COLUMN_COUNT = (ctx: FunctionContext, spreadsheet: SpreadsheetResult): NumberResult => {
  return { type: 'number', result: spreadsheet.result.columnCount() }
}

export const ROW_COUNT = (ctx: FunctionContext, spreadsheet: SpreadsheetResult): NumberResult => {
  return { type: 'number', result: spreadsheet.result.rowCount() }
}

export const SUMIFS = (
  ctx: FunctionContext,
  { result: column1 }: ColumnResult,
  { result: column2 }: ColumnResult,
  predicate: PredicateResult
): NumberResult | ErrorResult => {
  if (column1.namespaceId !== column2.namespaceId) {
    return { type: 'Error', result: 'Columns must be in the same namespace', errorKind: 'runtime' }
  }

  const predicateFunction: PredicateFunction = buildPredicate(predicate)
  let sum: number = 0

  column1.spreadsheet.listRows().forEach(row => {
    const value1 = Number(
      column1.spreadsheet.findCellDisplayData({ rowId: row.rowId, columnId: column1.columnId })?.display ?? 0
    )
    const value2 = Number(
      column1.spreadsheet.findCellDisplayData({ rowId: row.rowId, columnId: column2.columnId })?.display ?? 0
    )
    if (value1 && predicateFunction(value2)) {
      sum += value1
    }
  })

  return { type: 'number', result: sum }
}

export const AVERAGEIFS = (
  ctx: FunctionContext,
  { result: column1 }: ColumnResult,
  { result: column2 }: ColumnResult,
  predicate: PredicateResult
): NumberResult | ErrorResult => {
  if (column1.namespaceId !== column2.namespaceId) {
    return { type: 'Error', result: 'Columns must be in the same namespace', errorKind: 'runtime' }
  }

  const predicateFunction: PredicateFunction = buildPredicate(predicate)
  let sum: number = 0
  let count: number = 0

  column1.spreadsheet.listRows().forEach(row => {
    const value1 = Number(
      column1.spreadsheet.findCellDisplayData({ rowId: row.rowId, columnId: column1.columnId })?.display ?? 0
    )
    const value2 = Number(
      column1.spreadsheet.findCellDisplayData({ rowId: row.rowId, columnId: column2.columnId })?.display ?? 0
    )
    if (value1 && predicateFunction(value2)) {
      count += 1
      sum += value1
    }
  })

  if (count === 0) {
    return { type: 'Error', result: 'No matching values', errorKind: 'runtime' }
  }

  return { type: 'number', result: sum / count }
}

export const COUNTIFS = (
  ctx: FunctionContext,
  { result: column }: ColumnResult,
  predicate: PredicateResult
): NumberResult | ErrorResult => {
  const predicateFunction: PredicateFunction = buildPredicate(predicate)
  let sum: number = 0

  column.spreadsheet.listRows().forEach(row => {
    const value = Number(
      column.spreadsheet.findCellDisplayData({ rowId: row.rowId, columnId: column.columnId })?.display ?? 0
    )
    if (predicateFunction(value)) {
      sum += 1
    }
  })

  return { type: 'number', result: sum }
}

export const SUMPRODUCT = (
  ctx: FunctionContext,
  { result: column1 }: ColumnResult,
  { result: column2 }: ColumnResult
): NumberResult | ErrorResult => {
  if (column1.namespaceId !== column2.namespaceId) {
    return { type: 'Error', result: 'Columns must be in the same namespace', errorKind: 'runtime' }
  }

  let sum: number = 0

  column1.spreadsheet.listRows().forEach(row => {
    const value1 = Number(
      column1.spreadsheet.findCellDisplayData({ rowId: row.rowId, columnId: column1.columnId })?.display ?? 0
    )
    const value2 = Number(
      column1.spreadsheet.findCellDisplayData({ rowId: row.rowId, columnId: column2.columnId })?.display ?? 0
    )
    sum += value1 * value2
  })

  return { type: 'number', result: sum }
}

export const XLOOKUP = (
  ctx: FunctionContext,
  { result: lookupValue }: AnyTypeResult,
  { result: lookupColumn }: ColumnResult,
  { result: returnColumn }: ColumnResult,
  notFoundValue: StringResult,
  { result: matchMode }: NumberResult
): StringResult | ErrorResult => {
  if (lookupColumn.namespaceId !== returnColumn.namespaceId) {
    return { type: 'Error', result: 'Columns must be in the same namespace', errorKind: 'runtime' }
  }

  let result: StringResult = notFoundValue

  lookupColumn.spreadsheet.listRows().forEach(row => {
    let bol = false
    const compareData = Number(lookupValue)
    const data = Number(
      lookupColumn.spreadsheet.findCellDisplayData({ rowId: row.rowId, columnId: lookupColumn.columnId })?.display ?? 0
    )

    switch (matchMode) {
      case 0:
        bol = data === compareData
        break
      case 1:
        bol = data >= compareData
        break
      case 2:
        bol = data <= compareData
        break
    }

    if (bol) {
      result = {
        type: 'string',
        result:
          lookupColumn.spreadsheet.findCellDisplayData({ rowId: row.rowId, columnId: returnColumn.columnId })
            ?.display ?? ''
      }
    }
  })

  return result
}

export const VLOOKUP = (
  ctx: FunctionContext,
  { result: match }: AnyTypeResult,
  { result: spreadsheet }: SpreadsheetResult,
  { result: column }: ColumnResult,
  { result: range }: BooleanResult
): StringResult | ErrorResult => {
  if (spreadsheet.blockId !== column.namespaceId) {
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
    const firstCellValue = spreadsheet.findCellDisplayData({
      rowId: row.rowId,
      columnId: firstColumn.columnId
    })?.display
    const bol = range ? Number(firstCellValue) <= Number(matchData) : firstCellValue === matchData

    if (bol) {
      result = {
        type: 'string',
        result: spreadsheet.findCellDisplayData({ rowId: row.rowId, columnId: column.columnId })?.display ?? ''
      }
    }
  })

  return result
}

export const CORE_SPREADSHEET_CLAUSES: Array<BaseFunctionClause<'number' | 'string'>> = [
  {
    name: 'VLOOKUP',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'string', result: 'foo' } }],
    description: 'Returns the value of the column in the spreadsheet that matches the match value.',
    group: 'core',
    args: [
      {
        name: 'match',
        type: 'any'
      },
      {
        name: 'spreadsheet',
        type: 'Spreadsheet'
      },
      {
        name: 'column',
        type: 'Column'
      },
      {
        name: 'range',
        type: 'boolean',
        default: { type: 'boolean', result: true }
      }
    ],
    returns: 'string',
    testCases: [],
    chain: true,
    reference: VLOOKUP
  },
  {
    name: 'XLOOKUP',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'string', result: 'foo' } }],
    description: 'Returns the value of the column in the spreadsheet that matches the match value.',
    group: 'core',
    args: [
      {
        name: 'lookupValue',
        type: 'any'
      },
      {
        name: 'lookupColumn',
        type: 'Column'
      },
      {
        name: 'returnColumn',
        type: 'Column'
      },
      {
        name: 'notFoundValue',
        type: 'string',
        default: { type: 'string', result: '' }
      },
      {
        name: 'matchMode',
        type: 'number',
        default: { type: 'number', result: 0 }
      }
    ],
    returns: 'string',
    testCases: [],
    chain: true,
    reference: XLOOKUP
  },
  {
    name: 'SUM',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the sum of the column in the spreadsheet.',
    group: 'core',
    args: [
      {
        name: 'column',
        type: 'Column'
      }
    ],
    returns: 'number',
    testCases: [],
    chain: true,
    reference: SUM
  },
  {
    name: 'COLUMN_COUNT',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the column size of the spreadsheet.',
    group: 'core',
    args: [
      {
        name: 'spreadsheet',
        type: 'Spreadsheet'
      }
    ],
    returns: 'number',
    testCases: [],
    chain: true,
    reference: COLUMN_COUNT
  },
  {
    name: 'ROW_COUNT',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the row size of the spreadsheet.',
    group: 'core',
    args: [
      {
        name: 'spreadsheet',
        type: 'Spreadsheet'
      }
    ],
    returns: 'number',
    testCases: [],
    chain: true,
    reference: ROW_COUNT
  },
  {
    name: 'SUMIFS',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the sum of the column in the spreadsheet.',
    group: 'core',
    args: [
      {
        name: 'column1',
        type: 'Column'
      },
      {
        name: 'column2',
        type: 'Column'
      },
      {
        name: 'condition',
        type: 'Predicate'
      }
    ],
    returns: 'number',
    testCases: [],
    chain: false,
    reference: SUMIFS
  },
  {
    name: 'AVERAGEIFS',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the average of the column in the spreadsheet.',
    group: 'core',
    args: [
      {
        name: 'column1',
        type: 'Column'
      },
      {
        name: 'column2',
        type: 'Column'
      },
      {
        name: 'condition',
        type: 'Predicate'
      }
    ],
    returns: 'number',
    testCases: [],
    chain: false,
    reference: AVERAGEIFS
  },
  {
    name: 'COUNTIFS',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the sum of the column in the spreadsheet.',
    group: 'core',
    args: [
      {
        name: 'column',
        type: 'Column'
      },
      {
        name: 'condition',
        type: 'Predicate'
      }
    ],
    returns: 'number',
    testCases: [],
    chain: true,
    reference: COUNTIFS
  },
  {
    name: 'SUMPRODUCT',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the sum of the column in the spreadsheet.',
    group: 'core',
    args: [
      {
        name: 'column1',
        type: 'Column'
      },
      {
        name: 'column2',
        type: 'Column'
      }
    ],
    returns: 'number',
    testCases: [],
    chain: false,
    reference: SUMPRODUCT
  },
  {
    name: 'MAX',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the max of the column in the spreadsheet.',
    group: 'core',
    args: [
      {
        name: 'column',
        type: 'Column'
      }
    ],
    returns: 'number',
    testCases: [],
    chain: true,
    reference: MAX
  },
  {
    name: 'COUNTA',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the count of the column in the spreadsheet.',
    group: 'core',
    args: [
      {
        name: 'column',
        type: 'Column'
      }
    ],
    returns: 'number',
    testCases: [],
    chain: true,
    reference: COUNTA
  }
]
