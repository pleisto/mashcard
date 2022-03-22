import { SpreadsheetType } from '@brickdoc/formula'
import { SpreadsheetRender } from '../../Spreadsheet'

export interface FormulaSpreadsheetProps {
  spreadsheet: SpreadsheetType
  columnIds?: string[]
  rowIds?: string[]
  clip?: boolean
  select?: boolean
}

export const FormulaSpreadsheet: React.FC<FormulaSpreadsheetProps> = ({
  spreadsheet,
  columnIds,
  rowIds,
  clip,
  select
}) => {
  let columns = spreadsheet.listColumns()
  let rows = spreadsheet.listRows()

  if (clip && columnIds && rowIds) {
    columns = columns.filter(c => columnIds.includes(c.columnId))
    rows = rows.filter(r => rowIds.includes(r.rowId))
  }

  const valuesMatrix = new Map(
    rows.map(r => {
      const { rowId } = r
      return [
        r.rowId,
        new Map(columns.map(c => [c.columnId, spreadsheet.findCellDisplayData({ columnId: c.columnId, rowId })]))
      ]
    })
  )

  const defaultSelection = select && columnIds ? { columnIds } : {}

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
