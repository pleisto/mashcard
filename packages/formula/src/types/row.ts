import { RowType } from '../controls'
import { BaseResult, FindKey, FormulaTypeAttributes } from '../type'

const TypeName = 'Row' as const
const ShortName = 'row' as const

export type FormulaRowType = BaseResult<typeof TypeName, RowType, [string, FindKey]>

export const FormulaRowAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: ({ result, ...rest }) => ({ ...rest, result: [result.spreadsheetId, result.findKey] }),
  cast: ({ result, ...rest }, ctx) => {
    const row = ctx.findRow(result[0], result[1])
    return row
      ? { ...rest, result: row }
      : { ...rest, result: { message: 'errors.parse.not_found.row', type: 'deps' }, type: 'Error' }
  },
  display: ({ result, ...rest }) => ({ ...rest, result: `Row[${result.rowIndex}]` })
}
