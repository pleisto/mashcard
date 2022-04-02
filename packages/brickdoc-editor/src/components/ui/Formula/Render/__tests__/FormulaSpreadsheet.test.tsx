import { SpreadsheetType } from '@brickdoc/formula'
import { render } from '@testing-library/react'
import { FormulaSpreadsheet } from '../FormulaSpreadsheet'

describe('FormulaSpreadsheet', () => {
  it('renders FormulaSpreadsheet correctly', () => {
    const columnId = 'columnId'
    const rowId = 'rowId'
    const spreadsheet: Partial<SpreadsheetType> = {
      listColumns: () => [],
      listRows: () => [],
      spreadsheetId: 'blockId',
      findCellDisplayData: () => undefined,
      name: () => 'name'
    }
    const { container } = render(
      <FormulaSpreadsheet
        clip={true}
        select={true}
        columnIds={[columnId]}
        rowIds={[rowId]}
        spreadsheet={spreadsheet as SpreadsheetType}
      />
    )

    expect(container).toMatchSnapshot()
  })
})
