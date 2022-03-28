import { AnyTypeResult } from '../../types'
import { OperatorType } from '../operator'
import { extractSubType } from '../util'

export const arrayOperator: OperatorType = {
  name: 'array',
  expressionType: 'Array',
  skipReturnEarlyCheck: true,
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs }) => lhs,
  packageInterpretResult: result => {
    if (!result || result.type === 'null') return { type: 'Array', subType: 'void', result: [] }
    const arrayArgs = result.result as unknown as AnyTypeResult[]
    return { type: 'Array', subType: extractSubType(arrayArgs), result: arrayArgs }
  }
}
