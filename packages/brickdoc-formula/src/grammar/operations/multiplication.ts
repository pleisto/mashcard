import { tokenMatcher } from 'chevrotain'
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
        return { type: 'Error', result: 'Division by zero', errorKind: 'runtime' }
      }

      result = lhsResult / rhsResult
    } else if (tokenMatcher(operator, Caret)) {
      result = lhsResult ** rhsResult
    } else {
      throw new Error(`Unexpected operator ${operator.image}`)
    }

    if (isNaN(result)) {
      return { type: 'Error', result: `NaN`, errorKind: 'runtime' }
    }

    return { result, type: 'number' }
  }
}
