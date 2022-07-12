import { tokenMatcher } from 'chevrotain'
import { And, Or } from '../lexer'
import { OperatorType } from '../operator'

export const combineOperator: OperatorType = {
  name: 'combine',
  expressionType: 'boolean',
  lhsType: 'boolean',
  rhsType: 'boolean',
  interpret: async ({ lhs, rhs, operator }) => {
    const lhsResult = lhs.result as boolean
    const rhsResult = rhs!.result as boolean

    if (tokenMatcher(operator, And)) {
      return { result: lhsResult && rhsResult, type: 'boolean' }
    } else if (tokenMatcher(operator, Or)) {
      return { result: lhsResult || rhsResult, type: 'boolean' }
    } else {
      throw new Error(`Unexpected operator ${operator.image}`)
    }
  },
  testCases: {
    successTestCases: [
      { definition: '=true && false', result: false },
      { definition: '=false || true', result: true },
      { definition: '=false or true', result: true },
      { definition: '=false and true', result: false },
      { definition: '=true and !2 && true', result: false }
    ],
    errorTestCases: [
      { definition: '=1 and 2', errorType: 'type', errorMessage: 'Expected boolean but got number' },
      { definition: '=1 and false or 3', errorType: 'type', errorMessage: 'Expected boolean but got number' },
      { definition: '=true and', errorType: 'syntax', errorMessage: 'errors.parse.missing.expression' },
      { definition: '=and false', errorType: 'parse', errorMessage: 'Parse error: "and"', valid: false },
      { definition: '=and', errorType: 'syntax', errorMessage: 'errors.parse.missing.expression' },
      {
        definition: '="f" &&& 1',
        errorType: 'type',
        label: 'TODO &&&',
        errorMessage: 'Expected boolean but got string'
      }
    ]
  }
}
