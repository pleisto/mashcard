import { tokenMatcher } from 'chevrotain'
import { Minus, Plus } from '../lexer'
import { OperatorType } from '../operator'

export const additionOperator: OperatorType = {
  name: 'addition',
  expressionType: 'number',
  lhsType: 'number',
  rhsType: 'number',
  interpret: async ({ lhs, rhs, operator }) => {
    const lhsResult = lhs.result as number
    const rhsResult = rhs!.result as number

    if (tokenMatcher(operator, Plus)) {
      return { result: lhsResult + rhsResult, type: 'number' }
    } else if (tokenMatcher(operator, Minus)) {
      return { result: lhsResult - rhsResult, type: 'number' }
    } else {
      throw new Error(`Unexpected operator ${operator.image}`)
    }
  }
}
