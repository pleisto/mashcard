import { RowType } from '../controls'
import { BaseResult, FindKey, FormulaTypeAttributes } from '../type'

const TypeName = 'Row' as const

export type FormulaRowType = BaseResult<typeof TypeName, RowType, [string, FindKey]>

export const FormulaRowAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: ({ result, ...rest }) => ({ ...rest, result: [result.spreadsheetId, result.findKey] }),
  cast: ({ result, ...rest }, ctx) => {
    const row = ctx.findRow(result[0], result[1])
    return row ? { ...rest, result: row } : { ...rest, result: `Row not found`, meta: 'deps', type: 'Error' }
  },
  display: ({ result }) => `Row[${result.rowIndex}]`
}
