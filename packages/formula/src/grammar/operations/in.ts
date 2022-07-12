import { SpreadsheetInput } from '../../tests'
import { ExpressionType } from '../../type'
import { OperatorType } from '../operator'

const spreadsheetToken = 'InOperator.spreadsheet'

export const inOperator: OperatorType = {
  name: 'in',
  expressionType: 'boolean',
  lhsType: ['number', 'boolean', 'null', 'string'],
  rhsType: ['Spreadsheet', 'Column', 'Array', 'string'],
  dynamicParseRhsType: (cst, prevType, args, index) => {
    const newType: ExpressionType = (['string', 'number'] as const).some(r => [prevType].flat().includes(r))
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
        return { type: 'Error', result: 'Spreadsheet is empty', meta: 'runtime' }
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
        return { type: 'Error', result: 'Spreadsheet not found', meta: 'runtime' }
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
  },
  testCases: {
    pages: [
      {
        pageName: 'InOperator',
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<3, 3>>{
            name: 'spreadsheet',
            columns: [
              {
                name: 'first',
                displayIndex: 'A',
                cells: [{ value: '1' }, { value: '3' }, { value: '5' }]
              },
              {
                name: 'second',
                displayIndex: 'B',
                cells: [{ value: '2' }, { value: '4' }, { value: '6' }]
              },
              {
                name: 'third',
                displayIndex: 'C',
                cells: [{ value: '3' }, { value: '' }, { value: 'Foo' }]
              }
            ]
          }
        ]
      }
    ],
    successTestCases: [
      // Array
      { definition: '=1 in [1]', result: true },
      { definition: '=1 in []', result: false },
      { definition: '=1 in [1, 2]', result: true },
      { definition: '= 1 in [1, "foo", true]', result: true },
      { definition: '= "Foo" in [1, "foo", true, null]', result: true },
      { definition: '= "Foo" exactin [1, "foo", true, null]', result: false },
      { definition: '= true in [1, "foo", true, null]', result: true },
      { definition: '= true exactin [1, "foo", true, null]', result: true },
      { definition: '= null exactin [1, "foo", true, null]', result: true },
      { definition: '= false exactin [1, "foo", true, null]', result: false },
      // String
      { definition: '= "foo" in "barfoobaz"', result: true },
      { definition: '= "foo" in "barFoobaz"', result: true },
      { definition: '= "foo" exactin "barFoobaz"', result: false },
      { definition: '= "foo" exactin "barfoobaz"', result: true },

      // Spreadsheet
      { label: 'in spreadsheet true', definition: `=3 in ${spreadsheetToken}`, result: true },
      { label: 'in spreadsheet false', definition: `=4 in ${spreadsheetToken}`, result: false },
      {
        label: 'in column true',
        definition: `=3 in ${spreadsheetToken}."second"`,
        result: false,
        newAbbrevInput: `=3 in ${spreadsheetToken}.second`
      },
      { label: 'in column false', definition: `=4 in ${spreadsheetToken}.second`, result: true },
      { label: 'exactin column true', definition: `="foo" in ${spreadsheetToken}.third`, result: true }
    ],
    errorTestCases: [
      {
        definition: '= "foo" in 123',
        errorType: 'type',
        errorMessage: 'Expected string,Array,Spreadsheet,Column but got number'
      },
      {
        definition: '= false exactin "foo"',
        errorType: 'type',
        errorMessage: 'Expected Array but got string'
      },
      { definition: '= "foo" in', errorType: 'syntax', errorMessage: 'errors.parse.missing.expression' },
      { definition: '=in', errorType: 'syntax', errorMessage: 'errors.parse.missing.expression' },
      { definition: '=in 123', errorType: 'type', errorMessage: 'Expected Array but got number' },
      { definition: '=in []', errorType: 'parse', errorMessage: 'Parse error: "in"', valid: false }
    ]
  }
}
