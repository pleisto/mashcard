import { tokenMatcher } from 'chevrotain'
import { SpreadsheetInput } from '../../tests'
import { Minus, Plus } from '../lexer'
import { OperatorType } from '../operator'
import { castNumber } from '../util'

export const additionOperator: OperatorType = {
  name: 'addition',
  expressionType: 'number',
  lhsType: ['number', 'Cell'],
  rhsType: ['number', 'Cell'],
  interpret: async ({ lhs, rhs, operator }) => {
    const lhsResult = castNumber(lhs)
    const rhsResult = castNumber(rhs)
    let result

    if (tokenMatcher(operator, Plus)) {
      result = lhsResult + rhsResult
    } else if (tokenMatcher(operator, Minus)) {
      result = lhsResult - rhsResult
    } else {
      throw new Error(`Unexpected operator ${operator.image}`)
    }

    if (isNaN(result)) {
      return { type: 'Error', result: `NaN`, meta: 'runtime' }
    }

    return { result, type: 'number' }
  },
  testCases: {
    pages: [
      {
        pageName: 'Addition',
        variables: [{ variableName: 'bar', definition: '=123' }],
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<1, 4>>{
            name: 'spreadsheet',
            columns: [
              {
                name: 'first',
                cells: [{ value: '1' }, { value: '3' }, { value: 'unknown' }, { value: '' }]
              }
            ]
          }
        ]
      }
    ],
    successTestCases: [
      { definition: '=1+1', result: 2 },
      { definition: '=2 - 3', result: -1 },
      { definition: '=1 + 1 - 2 + 3 - 0', result: 3 },
      { definition: '=1 - (  -40%)', result: 1.4 },
      { definition: '=1 + Addition.bar', result: 124 },
      { definition: '=Addition.bar + Addition.spreadsheet.A.1', result: 124 },
      { definition: '=Addition.spreadsheet.A.1 + 1', result: 2 },
      { definition: '=Addition.spreadsheet.first.1 + 1', result: 2 },
      { definition: '=1 + Addition.spreadsheet.first.1', result: 2 },
      { definition: '=Addition.spreadsheet.first.1 + Addition.spreadsheet.first.2', result: 4 },
      { definition: '=Addition.spreadsheet.first.3 + 0', result: 'NaN' },
      { definition: '=Addition.spreadsheet.first.4 + 0', result: 0 },
      { definition: '=Addition.spreadsheet.first.4 + 0 + Addition.spreadsheet.first.2', result: 3 },
      { definition: '=Addition.spreadsheet.first.2 + Addition.spreadsheet.first.3', result: 'NaN' },
      { definition: '= 1/0 + 1', result: 'Division by zero', label: 'runtime error' }
    ],
    errorTestCases: [
      { definition: '=+', errorType: 'syntax', errorMessage: 'errors.parse.missing.expression' },
      { definition: '=-', errorType: 'syntax', errorMessage: 'Missing number' },
      { definition: '=+1', errorType: 'parse', errorMessage: 'Parse error: "+"', valid: false },
      { definition: '=1+', errorType: 'syntax', errorMessage: 'errors.parse.missing.expression' },
      { definition: '= 1+$', errorType: 'syntax', errorMessage: 'errors.parse.missing.expression' }
    ]
  }
}
