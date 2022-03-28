import { tokenMatcher } from 'chevrotain'
import { Caret, Div, Multi } from '../lexer'
import { OperatorType } from '../operator'

export const multiplicationOperator: OperatorType = {
  name: 'multiplication',
  expressionType: 'number',
  lhsType: 'number',
  rhsType: 'number',
  interpret: async ({ lhs, rhs, operator }) => {
    const lhsResult = lhs.result as number
    const rhsResult = rhs!.result as number

    if (tokenMatcher(operator, Multi)) {
      return { result: lhsResult * rhsResult, type: 'number' }
    } else if (tokenMatcher(operator, Div)) {
      if (rhsResult === 0) {
        return { type: 'Error', result: 'Division by zero', errorKind: 'runtime' }
      }

      return { result: lhsResult / rhsResult, type: 'number' }
    } else if (tokenMatcher(operator, Caret)) {
      return { result: lhsResult ** rhsResult, type: 'number' }
    } else {
      throw new Error(`Unexpected operator ${operator.image}`)
    }
  }
}
