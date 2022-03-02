import { SpreadsheetType } from '@brickdoc/formula'
import { SpreadsheetRender } from '../../Spreadsheet'

export interface FormulaSpreadsheetProps {
  spreadsheet: SpreadsheetType
}

export const FormulaSpreadsheet: React.FC<FormulaSpreadsheetProps> = ({ spreadsheet }) => {
  const columns = spreadsheet.listColumns()
  const rows = spreadsheet.listRows()

  const valuesMatrix = new Map(
    rows.map(r => {
      const { rowId } = r
      return [
        r.rowId,
        new Map(columns.map(c => [c.columnId, spreadsheet.findCellDisplayData({ columnId: c.columnId, rowId })]))
      ]
    })
  )

  return <SpreadsheetRender title={spreadsheet.name()} valuesMatrix={valuesMatrix} rows={rows} columns={columns} />
}
