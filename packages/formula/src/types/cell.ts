import { Cell, CellType, CellVia } from '../controls'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Cell' as const

export type FormulaCellType = BaseResult<typeof TypeName, CellType, [string, CellVia, Cell]>

export const FormulaCellAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: ({ result, ...rest }) => ({
    ...rest,
    result: [result.spreadsheetId, result.via, result._cell]
  }),
  cast: ({ result: [spreadsheetId, [type, findKey, key], cell], ...rest }, ctx) => {
    if (type === 'column') {
      const column = ctx.findColumn(spreadsheetId, findKey)
      return column
        ? { ...rest, result: column.newCell(cell, key) }
        : { ...rest, result: `Column not found`, meta: 'deps', type: 'Error' }
    } else {
      const row = ctx.findRow(spreadsheetId, findKey)
      return row
        ? { ...rest, result: row.newCell(cell, key) }
        : { ...rest, result: `Row not found`, meta: 'deps', type: 'Error' }
    }
  },
  display: ({ result, ...rest }) => ({ ...rest, result: result.getValue() })
}
