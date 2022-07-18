import { Cell, CellType, CellVia } from '../controls'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Cell' as const
const ShortName = 'cell' as const

export type FormulaCellType = BaseResult<typeof TypeName, CellType, [string, CellVia, Cell]>

export const FormulaCellAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: ({ result, ...rest }) => ({
    ...rest,
    result: [result.spreadsheetId, result.via, result._cell]
  }),
  cast: ({ result: [spreadsheetId, [type, findKey, key], cell], ...rest }, ctx) => {
    if (type === 'column') {
      const column = ctx.findColumn(spreadsheetId, findKey)
      return column
        ? { ...rest, result: column.newCell(cell, key) }
        : { ...rest, result: { message: `Column not found`, type: 'deps' }, type: 'Error' }
    } else {
      const row = ctx.findRow(spreadsheetId, findKey)
      return row
        ? { ...rest, result: row.newCell(cell, key) }
        : { ...rest, result: { message: `Row not found`, type: 'deps' }, type: 'Error' }
    }
  },
  display: ({ result, ...rest }) => ({ ...rest, result: result.getValue() })
}
