import { SpreadsheetType } from '@brickdoc/formula'
import { SpreadsheetRender } from '../../Spreadsheet'

export interface FormulaSpreadsheetProps {
  spreadsheet: SpreadsheetType
  columnIds?: string[]
}

export const FormulaSpreadsheet: React.FC<FormulaSpreadsheetProps> = ({ spreadsheet, columnIds }) => {
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

  const defaultSelection = columnIds ? { columnIds } : {}

  return (
    <SpreadsheetRender
      title={spreadsheet.name()}
      valuesMatrix={valuesMatrix}
      rows={rows}
      columns={columns}
      defaultSelection={defaultSelection}
    />
  )
}
