import { AnyTypeResult } from '../../types'
import { FormulaInterpreter } from '../interpreter'
import { OperatorType } from '../operator'

const maybeTrackRuntimeDependency = (interpreter: FormulaInterpreter, result: AnyTypeResult): void => {
  if (!(result.type === 'Spreadsheet' || result.type === 'Column' || result.type === 'Row' || result.type === 'Cell')) {
    return
  }

  const eventDependency = result.result.eventDependency({})
  interpreter.runtimeEventDependencies.push(eventDependency)
}

export const accessAttribute = async (
  interpreter: FormulaInterpreter,
  result: AnyTypeResult,
  key: string
): Promise<AnyTypeResult> => {
  if (result.type === 'Block' || result.type === 'Spreadsheet' || result.type === 'Column' || result.type === 'Row') {
    const finalResult = await result.result.handleInterpret(interpreter, key)
    maybeTrackRuntimeDependency(interpreter, finalResult)
    return finalResult
  }

  if (result.type === 'Record') {
    const value = result.result[key]
    if (value) {
      return value
    } else {
      return { type: 'Error', result: `Key ${key} not found`, errorKind: 'runtime' }
    }
  }

  if (result.type === 'Array') {
    const number = Number(key)
    if (isNaN(number)) {
      return { type: 'Error', result: `Need a number: ${key}`, errorKind: 'syntax' }
    } else {
      return (
        result.result[number - 1] || {
          type: 'Error',
          result: `Index ${number} out of bounds`,
          errorKind: 'runtime'
        }
      )
    }
  }

  if (result.type === 'Reference') {
    return { type: 'Reference', result: { ...result.result, attribute: key } }
  }

  return { type: 'Error', result: `Access not supported for ${result.type}`, errorKind: 'runtime' }
}

export const accessOperator: OperatorType = {
  name: 'access',
  expressionType: 'any',
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs, rhs, cst, interpreter }) => {
    return await accessAttribute(interpreter, lhs, String(rhs!.result) as string)
  }
}
