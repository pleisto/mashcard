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
  }
}
