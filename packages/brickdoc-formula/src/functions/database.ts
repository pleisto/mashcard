import {
  FunctionContext,
  BasicFunctionClause,
  NumberResult,
  ColumnResult,
  SpreadsheetResult,
  ErrorResult,
  PredicateResult,
  PredicateFunction,
  StringResult,
  AnyTypeResult,
  ArrayResult,
  DatabaseFactory,
  DatabaseDefinition,
  Column,
  Row,
  RecordResult,
  BooleanResult
} from '..'
import { buildPredicate } from '../grammar/predicate'
import { v4 as uuid } from 'uuid'

export const SUM = (ctx: FunctionContext, { result: column }: ColumnResult): NumberResult | ErrorResult => {
  const database = ctx.ctx.findDatabase(column.namespaceId)
  if (!database) {
    return { type: 'Error', result: 'Database not found', errorKind: 'runtime' }
  }

  const rows: number[] = database.listRows().map(row => Number(row[column.columnId]) || 0)
  return { type: 'number', result: rows.reduce((a, b) => a + b, 0) }
}


export const Table = (ctx: FunctionContext, { result }: ArrayResult): SpreadsheetResult | ErrorResult => {
  const defaultData: RecordResult[] = [
    {
      type: 'Record',
      subType: 'string',
      result: { Column1: { type: 'string', result: '1' }, Column2: { type: 'string', result: '2' } }
    },
    {
      type: 'Record',
      subType: 'string',
      result: { Column1: { type: 'string', result: '3' }, Column2: { type: 'string', result: '4' } }
    }
  ]

  const recordData: RecordResult[] = result.length ? (result as RecordResult[]) : defaultData

  const nonRecordElement = recordData.find(e => e.type !== 'Record')
  if (nonRecordElement) {
    return { type: 'Error', result: 'Table must be an array of records', errorKind: 'runtime' }
  }

  const blockId = uuid()
  const tableName = 'Dynamic'
  const columns: Column[] = []
  const rows: Row[] = []

  if (recordData.length) {
    const data = recordData.map(e => e.result)
    const keys = Object.keys(data[0])
    const keyWithIds = keys.map(key => ({ key, uuid: uuid() }))

    columns.push(
      ...keys.map((key, index) => ({
        namespaceId: blockId,
        columnId: keyWithIds.find(k => k.key === key)!.uuid,
        name: key,
        index,
        spreadsheetName: tableName,
        type: 'text',
        rows: data.map(e => String(e[key].result || ''))
      }))
    )

    rows.push(
      ...data.map(source => {
        const row: Row = { id: uuid() }

        keyWithIds.forEach(({ key, uuid }) => {
          row[uuid] = String(source[key].result || '')
        })

        return row
      })
    )
  }

  // console.log({ recordData, rows, columns })

  const databaseDefinition: DatabaseDefinition = {
    blockId,
    dynamic: true,
    name: () => tableName,
    listColumns: () => columns,
    listRows: () => rows
  }

  const database = new DatabaseFactory(databaseDefinition)
  return { type: 'Spreadsheet', result: database }
}

export const MAX = (ctx: FunctionContext, { result: column }: ColumnResult): NumberResult | ErrorResult => {
  const database = ctx.ctx.findDatabase(column.namespaceId)
  if (!database) {
    return { type: 'Error', result: 'Database not found', errorKind: 'runtime' }
  }

  const rows: number[] = database.listRows().map(row => Number(row[column.columnId]) || 0)
  return { type: 'number', result: Math.max(...rows) }
}

export const COUNTA = (ctx: FunctionContext, { result: column }: ColumnResult): NumberResult | ErrorResult => {
  const database = ctx.ctx.findDatabase(column.namespaceId)
  if (!database) {
    return { type: 'Error', result: 'Database not found', errorKind: 'runtime' }
  }

  const counta = database.listRows().filter(row => !!row[column.columnId]).length
  return { type: 'number', result: counta }
}

export const COLUMN_COUNT = (ctx: FunctionContext, database: SpreadsheetResult): NumberResult => {
  return { type: 'number', result: database.result.columnCount() }
}

export const ROW_COUNT = (ctx: FunctionContext, database: SpreadsheetResult): NumberResult => {
  return { type: 'number', result: database.result.rowCount() }
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

  const database = ctx.ctx.findDatabase(column1.namespaceId)
  if (!database) {
    return { type: 'Error', result: 'Database not found', errorKind: 'runtime' }
  }

  const predicateFunction: PredicateFunction = buildPredicate(predicate)
  let sum: number = 0

  database.listRows().forEach(row => {
    const value1 = Number(row[column1.columnId])
    const value2 = Number(row[column2.columnId])
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

  const database = ctx.ctx.findDatabase(column1.namespaceId)
  if (!database) {
    return { type: 'Error', result: 'Database not found', errorKind: 'runtime' }
  }

  const predicateFunction: PredicateFunction = buildPredicate(predicate)
  let sum: number = 0
  let count: number = 0

  database.listRows().forEach(row => {
    const value1 = Number(row[column1.columnId])
    const value2 = Number(row[column2.columnId])
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
  const database = ctx.ctx.findDatabase(column.namespaceId)
  if (!database) {
    return { type: 'Error', result: 'Database not found', errorKind: 'runtime' }
  }

  const predicateFunction: PredicateFunction = buildPredicate(predicate)
  let sum: number = 0

  database.listRows().forEach(row => {
    const value = Number(row[column.columnId])
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

  const database = ctx.ctx.findDatabase(column1.namespaceId)
  if (!database) {
    return { type: 'Error', result: 'Database not found', errorKind: 'runtime' }
  }

  let sum: number = 0

  database.listRows().forEach(row => {
    const value1 = Number(row[column1.columnId])
    const value2 = Number(row[column2.columnId])
    sum += value1 * value2
  })

  return { type: 'number', result: sum }
}

export const VLOOKUP = (
  ctx: FunctionContext,
  { result: match }: AnyTypeResult,
  { result: database }: SpreadsheetResult,
  { result: column }: ColumnResult,
  { result: range }: BooleanResult
): StringResult | ErrorResult => {
  if (database.blockId !== column.namespaceId) {
    return { type: 'Error', result: 'Column must be in the same namespace', errorKind: 'runtime' }
  }

  const columns = database.listColumns()

  const firstColumn = columns[0]
  if (!firstColumn) {
    return { type: 'Error', result: 'Database is empty', errorKind: 'runtime' }
  }

  if (firstColumn.columnId === column.columnId) {
    return { type: 'Error', result: 'Column cannot be the same as the first column', errorKind: 'runtime' }
  }

  if (!columns.find(c => c.columnId === column.columnId)) {
    return { type: 'Error', result: 'Column not found', errorKind: 'runtime' }
  }

  let result: StringResult | ErrorResult = { type: 'Error', result: 'Not found', errorKind: 'runtime' }

  const matchData = String(match)

  database.listRows().forEach(row => {
    const bol = range ? Number(row[firstColumn.columnId]) <= Number(matchData) : row[firstColumn.columnId] === matchData

    if (bol) {
      result = { type: 'string', result: row[column.columnId] ?? '' }
    }
  })

  return result
}

const VLOOKUP_CLAUSE: BasicFunctionClause<'string'> = {
  name: 'VLOOKUP',
  async: false,
  pure: false,
  lazy: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'string', result: 'foo' } }],
  description: 'Returns the value of the column in the database that matches the match value.',
  group: 'core',
  args: [
    {
      name: 'match',
      type: 'any'
    },
    {
      name: 'database',
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
}

const TABLE_CLAUSE: BasicFunctionClause<'Spreadsheet'> = {
  name: 'Table',
  async: false,
  pure: false,
  lazy: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: null }],
  description: 'Returns the table.',
  group: 'core',
  args: [{ name: 'array', type: 'Array' }],
  returns: 'Spreadsheet',
  testCases: [],
  chain: true,
  reference: Table
}

const NUMBER_CLAUSES: Array<BasicFunctionClause<'number'>> = [
  {
    name: 'SUM',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the sum of the column in the database.',
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
    description: 'Returns the column size of the database.',
    group: 'core',
    args: [
      {
        name: 'database',
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
    description: 'Returns the row size of the database.',
    group: 'core',
    args: [
      {
        name: 'database',
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
    description: 'Returns the sum of the column in the database.',
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
    description: 'Returns the average of the column in the database.',
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
    description: 'Returns the sum of the column in the database.',
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
    description: 'Returns the sum of the column in the database.',
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
    description: 'Returns the max of the column in the database.',
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
    description: 'Returns the count of the column in the database.',
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

export const CORE_DATABASE_CLAUSES = [TABLE_CLAUSE, VLOOKUP_CLAUSE, ...NUMBER_CLAUSES]
