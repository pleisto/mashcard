import { Cell, Column, ContextInterface, Database, FunctionClause } from '../..'

export const SUM = (ctx: ContextInterface, column: Column): number => {
  const rows: number[] = ctx.listCellByColumn(column).map((cell: Cell) => Number(cell.value) || 0)

  return rows.reduce((a, b) => a + b, 0)
}

export const SIZE = (ctx: ContextInterface, database: Database): number => {
  return database.size()
}

export const DATABASE_BASIC_CLAUSES: FunctionClause[] = [
  {
    name: 'SUM',
    async: false,
    pure: false,
    effect: false,
    description: 'Returns the sum of the column in the database.',
    group: 'database',
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
    group: 'database',
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
