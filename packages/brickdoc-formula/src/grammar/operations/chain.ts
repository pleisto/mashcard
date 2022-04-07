import { OperatorType } from '../operator'
import { accessAttribute } from './access'

export const chainOperator: OperatorType = {
  name: 'chain',
  expressionType: 'any',
  lhsType: 'any',
  rhsType: 'any',
  dynamicInterpretRhsType: ({ result, cst, args }) => {
    if (cst.name === 'keyExpression') {
      return { ...args, type: 'any' }
    }

    if (cst.name === 'FunctionCall') {
      return { ...args, chainArgs: result }
    }

    return args
  },
  interpret: async ({ lhs, rhs, cst, interpreter }) => {
    if (cst.name === 'FunctionCall') {
      return rhs!
    }

    if (cst.name === 'keyExpression') {
      return await accessAttribute(interpreter, lhs, rhs!.result as string)
    }

    throw new Error(`Unexpected cst type ${cst.name}`)
  }
}
