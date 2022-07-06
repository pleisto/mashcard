import { ArrayResult } from '../../type'
import { OperatorType } from '../operator'
import { extractSubType } from '../util'

export const argumentsOperator: OperatorType = {
  name: 'arguments',
  expressionType: 'any',
  skipReturnEarlyCheck: true,
  skipReturnFinalCheck: true,
  dynamicInterpretLhs: async () => ({ type: 'Array', meta: 'void', result: [] }),
  dynamicInterpretRhsType: ({ args, index }) => ({ ...args, type: args.finalTypes[index] ?? 'any' }),
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs, rhs }) => {
    const { result: lhsResult, type, meta } = lhs as ArrayResult
    return { type, meta, result: [...lhsResult, rhs!] }
  },
  packageInterpretResult: ({ result: inputResult }) => {
    const result = inputResult as ArrayResult['result']
    return { type: 'Array', meta: extractSubType(result), result }
  }
}
