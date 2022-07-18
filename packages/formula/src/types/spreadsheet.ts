import { SpreadsheetType } from '../controls'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Spreadsheet' as const
const ShortName = 'spreadsheet' as const

export type FormulaSpreadsheetType = BaseResult<typeof TypeName, SpreadsheetType, [string, string]>

export const FormulaSpreadsheetAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: ({ result, ...rest }) => ({ ...rest, result: [result.namespaceId, result.spreadsheetId] }),
  cast: ({ result, ...rest }, ctx) => {
    const spreadsheet = ctx.findSpreadsheet({ type: 'id', namespaceId: result[0], value: result[1] })
    return spreadsheet
      ? { ...rest, result: spreadsheet }
      : { ...rest, result: { message: `Spreadsheet not found`, type: 'deps' }, type: 'Error' }
  },
  display: ({ result, ...rest }) => ({ ...rest, result: result.name() })
}
