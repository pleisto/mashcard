import { tokenMatcher } from 'chevrotain'
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
      return { type: 'Error', result: `NaN`, errorKind: 'runtime' }
    }

    return { result, type: 'number' }
  }
}
