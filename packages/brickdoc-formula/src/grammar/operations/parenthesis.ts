import { OperatorType } from '../operator'

export const parenthesisOperator: OperatorType = {
  name: 'parenthesis',
  expressionType: 'any',
  dynamicParseType: lhsType => lhsType,
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs }) => lhs
}
