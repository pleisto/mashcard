import { CellType } from '../../controls'
import { OperatorType } from '../operator'

export const rangeOperator: OperatorType = {
  name: 'range',
  expressionType: 'Range',
  lhsType: 'Cell',
  rhsType: 'Cell',
  interpret: async ({ ctx, lhs, rhs }) => {
    const startCell = lhs.result as CellType
    const endCell = rhs!.result as CellType

    const spreadsheet = ctx.formulaContext.findSpreadsheetById(startCell.spreadsheetId)

    if (!spreadsheet) {
      return { type: 'Error', result: 'Spreadsheet not found', errorKind: 'runtime' }
    }

    const columnIndexMax = Math.max(startCell.columnIndex, endCell.columnIndex)
    const columnIndexMin = Math.min(startCell.columnIndex, endCell.columnIndex)
    const rowIndexMax = Math.max(startCell.rowIndex, endCell.rowIndex)
    const rowIndexMin = Math.min(startCell.rowIndex, endCell.rowIndex)

    const columnIds = spreadsheet
      .listColumns()
      .filter(c => c.index >= columnIndexMin && c.index <= columnIndexMax)
      .map(c => c.columnId)
    const rowIds = spreadsheet
      .listRows()
      .filter(r => r.rowIndex >= rowIndexMin && r.rowIndex <= rowIndexMax)
      .map(r => r.rowId)

    return {
      type: 'Range',
      result: {
        startCell,
        spreadsheetId: startCell.spreadsheetId,
        columnIds,
        rowIds,
        endCell,
        columnSize: columnIndexMax - columnIndexMin + 1,
        rowSize: rowIndexMax - rowIndexMin + 1
      }
    }
  }
}
