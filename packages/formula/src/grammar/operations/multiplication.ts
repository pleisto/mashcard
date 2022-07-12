import { tokenMatcher } from 'chevrotain'
import { SpreadsheetInput } from '../../tests'
import { Caret, Div, Multi } from '../lexer'
import { OperatorType } from '../operator'
import { castNumber } from '../util'

export const multiplicationOperator: OperatorType = {
  name: 'multiplication',
  expressionType: 'number',
  lhsType: ['number', 'Cell'],
  rhsType: ['number', 'Cell'],
  interpret: async ({ lhs, rhs, operator }) => {
    const lhsResult = castNumber(lhs)
    const rhsResult = castNumber(rhs)
    let result

    if (tokenMatcher(operator, Multi)) {
      result = lhsResult * rhsResult
    } else if (tokenMatcher(operator, Div)) {
      if (rhsResult === 0) {
        return { type: 'Error', result: 'errors.interpret.runtime.division_by_zero', meta: 'runtime' }
      }

      result = lhsResult / rhsResult
    } else if (tokenMatcher(operator, Caret)) {
      result = lhsResult ** rhsResult
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
        pageName: 'Multi',
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<1, 4>>{
            name: 'spreadsheet',
            columns: [
              {
                name: 'first',
                cells: [{ value: '2' }, { value: '3' }, { value: 'unknown' }, { value: '' }]
              }
            ]
          }
        ]
      }
    ],
    successTestCases: [
      {
        definition: '=1/0',
        result: 'errors.interpret.runtime.division_by_zero',
        groupOptions: [{ name: 'basicError' }]
      },
      { definition: '=2*2', result: 4 },
      { definition: '=1.4 / 2', result: 0.7 },
      { definition: '= 2 ^ 4', result: 16 },
      { definition: '= 2 ^ 0', result: 1 },
      { definition: '= 0 ^ 0', result: 1 },
      { definition: '= ( 3 + 4 ) * 5 - 2', result: 33 },
      { definition: '= 1 + 6 / 2 - 3', result: 1 },
      { definition: '= 1 + 5 / 2', result: 3.5 },
      { definition: '= 1 + 2 * 3', label: 'mul > add', result: 7 },
      { definition: '=Multi.spreadsheet.A.1 * 2.1', result: 4.2 },
      { definition: '=Multi.spreadsheet.first.1 / 2', result: 1 },
      { definition: '=3 * Multi.spreadsheet.first.1', result: 6 },
      { definition: '=Multi.spreadsheet.first.1 * Multi.spreadsheet.first.2', result: 6 },
      { definition: '=Multi.spreadsheet.first.3 * 0', result: 'NaN' },
      { definition: '=Multi.spreadsheet.first.4 * 10', result: 0 },
      { definition: '=Multi.spreadsheet.first.4 * 1 * Multi.spreadsheet.first.2', result: 0 },
      { definition: '=Multi.spreadsheet.first.2 + Multi.spreadsheet.first.3', result: 'NaN' }
    ],
    errorTestCases: [
      { definition: '= 2 ^ true', errorType: 'type', errorMessage: 'Expected number,Cell but got boolean' },
      { definition: '= 2 * (2 = 4)', errorType: 'type', errorMessage: 'Expected number,Cell but got boolean' },
      { definition: '=1**2', errorType: 'syntax', errorMessage: 'errors.parse.missing.expression' }
    ]
  }
}
