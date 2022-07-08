import { ColumnType } from '../controls'
import { BaseResult, FindKey, FormulaTypeAttributes } from '../type'

const TypeName = 'Column' as const

export type FormulaColumnType = BaseResult<typeof TypeName, ColumnType, [string, FindKey]>

export const FormulaColumnAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: ({ result, ...rest }) => ({ ...rest, result: [result.spreadsheetId, result.findKey] }),
  cast: ({ result, ...rest }, ctx) => {
    const column = ctx.findColumn(result[0], result[1])
    return column ? { ...rest, result: column } : { ...rest, result: `Column not found`, meta: 'deps', type: 'Error' }
  },
  display: ({ result, ...rest }) => ({ ...rest, result: `${result.spreadsheet.name()}.${result.display()}` })
}
