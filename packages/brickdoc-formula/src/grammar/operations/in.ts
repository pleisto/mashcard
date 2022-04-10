import { ExpressionType } from '../../types'
import { OperatorType } from '../operator'

export const inOperator: OperatorType = {
  name: 'in',
  expressionType: 'boolean',
  lhsType: ['number', 'boolean', 'null', 'string'],
  rhsType: ['Spreadsheet', 'Column', 'Array', 'string'],
  dynamicParseRhsType: (cst, prevType, args, index) => {
    const newType: ExpressionType = ['string', 'number'].includes(prevType)
      ? ['string', 'Array', 'Spreadsheet', 'Column']
      : ['Array']
    return { ...args, type: newType }
  },
  interpret: async ({ interpreter, lhs, rhs, operator }) => {
    const isExactIn = operator.tokenType.name === 'ExactIn'
    if (rhs!.type === 'Spreadsheet') {
      const match = String(lhs.result)
      const spreadsheet = rhs.result

      const columns = spreadsheet.listColumns()

      const firstColumn = columns[0]
      if (!firstColumn) {
        return { type: 'Error', result: 'Spreadsheet is empty', errorKind: 'runtime' }
      }

      const row = spreadsheet.listRows().find(row => {
        const firstCellValue =
          spreadsheet.findCellValue({
            rowId: row.rowId,
            columnId: firstColumn.columnId
          }) ?? ''
        if (isExactIn) {
          return firstCellValue === match
        } else {
          return firstCellValue.toUpperCase() === match.toUpperCase()
        }
      })

      return { type: 'boolean', result: !!row }
    }

    if (rhs!.type === 'Column') {
      const match = String(lhs.result)
      const column = rhs.result
      const spreadsheet = interpreter.ctx.formulaContext.findSpreadsheet({
        namespaceId: column.spreadsheet.namespaceId,
        type: 'id',
        value: column.spreadsheetId
      })
      if (!spreadsheet) {
        return { type: 'Error', result: 'Spreadsheet not found', errorKind: 'runtime' }
      }

      const row = spreadsheet.listRows().find(row => {
        const cellValue = spreadsheet.findCellValue({ rowId: row.rowId, columnId: column.columnId }) ?? ''
        if (isExactIn) {
          return cellValue === match
        } else {
          return cellValue.toUpperCase() === match.toUpperCase()
        }
      })

      return { type: 'boolean', result: !!row }
    }

    if (rhs!.type === 'string') {
      if (isExactIn) {
        return { result: rhs.result.includes(String(lhs.result)), type: 'boolean' }
      } else {
        return { result: rhs.result.toUpperCase().includes(String(lhs.result).toUpperCase()), type: 'boolean' }
      }
    }

    if (rhs!.type === 'Array') {
      if (isExactIn) {
        const match = String(lhs.result)
        const finalresult = rhs.result.map(e => String(e.result))
        return { result: finalresult.includes(match), type: 'boolean' }
      } else {
        const match = String(lhs.result).toUpperCase()
        const finalresult = rhs.result.map(e => String(e.result).toUpperCase())
        return { result: finalresult.includes(match), type: 'boolean' }
      }
    }

    throw new Error(`Unsupported type ${rhs!.type}`)
  }
}
