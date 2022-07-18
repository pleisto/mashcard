import { ColumnType } from '../controls'
import { BaseResult, FindKey, FormulaTypeAttributes } from '../type'

const TypeName = 'Column' as const
const ShortName = 'column' as const

export type FormulaColumnType = BaseResult<typeof TypeName, ColumnType, [string, FindKey]>

export const FormulaColumnAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: ({ result, ...rest }) => ({ ...rest, result: [result.spreadsheetId, result.findKey] }),
  cast: ({ result, ...rest }, ctx) => {
    const column = ctx.findColumn(result[0], result[1])
    return column
      ? { ...rest, result: column }
      : { ...rest, result: { message: 'errors.parse.not_found.column', type: 'deps' }, type: 'Error' }
  },
  display: ({ result, ...rest }) => ({ ...rest, result: `${result.spreadsheet.name()}.${result.display()}` })
}
