import { SpreadsheetType } from '../controls'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Spreadsheet' as const

export type FormulaSpreadsheetType = BaseResult<typeof TypeName, SpreadsheetType, [string, string]>

export const FormulaSpreadsheetAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: ({ result, ...rest }) => ({ ...rest, result: [result.namespaceId, result.spreadsheetId] }),
  cast: ({ result, ...rest }, ctx) => {
    const spreadsheet = ctx.findSpreadsheet({ type: 'id', namespaceId: result[0], value: result[1] })
    return spreadsheet
      ? { ...rest, result: spreadsheet }
      : { ...rest, result: `Spreadsheet not found`, meta: 'deps', type: 'Error' }
  }
}
