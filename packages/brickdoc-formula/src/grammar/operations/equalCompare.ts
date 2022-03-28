import { tokenMatcher } from 'chevrotain'
import { Equal, Equal2, NotEqual, NotEqual2 } from '../lexer'
import { OperatorType } from '../operator'

export const equalCompareOperator: OperatorType = {
  name: 'combine',
  expressionType: 'boolean',
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs, rhs, operator }) => {
    const lhsResult = lhs.result
    const rhsResult = rhs!.result

    if (tokenMatcher(operator, Equal) || tokenMatcher(operator, Equal2)) {
      return { result: lhsResult === rhsResult, type: 'boolean' }
    } else if (tokenMatcher(operator, NotEqual) || tokenMatcher(operator, NotEqual2)) {
      return { result: lhsResult !== rhsResult, type: 'boolean' }
    } else {
      throw new Error(`Unexpected operator ${operator.image}`)
    }
  }
}
