import { OperatorType } from '../operator'

export const recordFieldOperator: OperatorType = {
  name: 'recordField',
  expressionType: 'Record',
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs, rhs }) => {
    return { type: 'Record', subType: 'any', result: { key: lhs, value: rhs! } }
  }
}
