import { ArrayResult } from '../../types'
import { OperatorType } from '../operator'
import { extractSubType } from '../util'

export const argumentsOperator: OperatorType = {
  name: 'arguments',
  expressionType: 'any',
  skipReturnEarlyCheck: true,
  skipReturnFinalCheck: true,
  dynamicInterpretLhs: () => ({ type: 'Array', subType: 'void', result: [] }),
  dynamicInterpretRhsType: ({ args, index }) => ({ ...args, type: args.finalTypes[index] ?? 'any' }),
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs, rhs }) => {
    const { result: lhsResult, type, subType } = lhs as ArrayResult
    return { type, subType, result: [...lhsResult, rhs!] }
  },
  packageInterpretResult: ({ result: inputResult }) => {
    const result = inputResult as ArrayResult['result']
    return { type: 'Array', subType: extractSubType(result), result }
  }
}
