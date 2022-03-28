import { OperatorType } from '../operator'

export const expressionOperator: OperatorType = {
  name: 'concat',
  expressionType: 'any',
  skipReturnEarlyCheck: true,
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs, rhs }) => {
    if (rhs!.type === 'Function' && lhs.type === 'Function') {
      return { type: 'Function', result: [...lhs.result, ...rhs!.result] }
    }

    return rhs!
  }
}
