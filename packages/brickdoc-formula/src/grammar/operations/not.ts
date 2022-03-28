import { OperatorType } from '../operator'

export const notOperator: OperatorType = {
  name: 'not',
  expressionType: 'boolean',
  skipRhsCstParse: true,
  reverseLhsAndRhs: true,
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs }) => {
    return { type: 'boolean', result: !lhs.result }
  }
}
