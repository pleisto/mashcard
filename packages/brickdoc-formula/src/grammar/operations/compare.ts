import { tokenMatcher } from 'chevrotain'
import { GreaterThan, LessThan, GreaterThanEqual, LessThanEqual } from '../lexer'
import { OperatorType } from '../operator'

export const compareOperator: OperatorType = {
  name: 'compare',
  expressionType: 'boolean',
  lhsType: 'number',
  rhsType: 'number',
  interpret: async ({ lhs, rhs, operator }) => {
    const lhsResult = lhs.result as number
    const rhsResult = rhs!.result as number

    if (tokenMatcher(operator, GreaterThan)) {
      return { result: lhsResult > rhsResult, type: 'boolean' }
    } else if (tokenMatcher(operator, LessThan)) {
      return { result: lhsResult < rhsResult, type: 'boolean' }
    } else if (tokenMatcher(operator, GreaterThanEqual)) {
      return { result: lhsResult >= rhsResult, type: 'boolean' }
    } else if (tokenMatcher(operator, LessThanEqual)) {
      return { result: lhsResult <= rhsResult, type: 'boolean' }
    } else {
      throw new Error(`Unexpected operator ${operator.image}`)
    }
  }
}
