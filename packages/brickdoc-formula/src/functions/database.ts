import { Cell, Column, ContextInterface, Database, BaseFunctionClause, NumberResult } from '..'

export const SUM = (ctx: ContextInterface, column: Column): NumberResult => {
  const rows: number[] = ctx.listCellByColumn(column).map((cell: Cell) => Number(cell.value) || 0)

  return { type: 'number', result: rows.reduce((a, b) => a + b, 0) }
}

export const SIZE = (ctx: ContextInterface, database: Database): NumberResult => {
  return { type: 'number', result: database.size() }
}

export const CORE_DATABASE_CLAUSES: Array<BaseFunctionClause<'number'>> = [
  {
    name: 'SUM',
    async: false,
    pure: false,
    effect: false,
    description: 'Returns the sum of the column in the database.',
    group: 'core',
    args: [
      {
        name: 'column',
        type: 'Column'
      }
    ],
    returns: 'number',
    examples: [],
    chain: true,
    reference: SUM
  },
  {
    name: 'SIZE',
    async: false,
    pure: false,
    effect: false,
    description: 'Returns the size of the database.',
    group: 'core',
    args: [
      {
        name: 'database',
        type: 'Block'
      }
    ],
    returns: 'number',
    examples: [],
    chain: true,
    reference: SIZE
  }
]
