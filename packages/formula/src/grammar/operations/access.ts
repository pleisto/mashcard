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
  },
  testCases: {
    successTestCases: [
      { definition: '=[1,2,3] [1]', result: 1 },
      { definition: '=[1,2,3][0]', result: 'Index 0 out of bounds' },
      { definition: '=[][1]', result: 'Index 1 out of bounds' },
      { definition: '={a: 1}["a" & ""]', result: 1 },
      { definition: '={a: 1}[1+1]', result: 'Key 2 not found' },
      { definition: '={a: 1}["b"]', result: 'Key b not found' },
      { definition: '={}["a"]', result: 'Key a not found' },
      { definition: '=1[1]', label: 'TODO check', result: 'Access not supported for number' },
      { definition: '="123"[1]', label: 'TODO check', result: 'Access not supported for string' },
      { definition: '=[2, "foo", true][2]', result: 'foo' },
      { definition: '=[2, "foo", true]["2"]', result: 'foo' },
      { definition: '=[2, "foo", true][1]+1 * 12', result: 14 }
    ],
    errorTestCases: [
      { definition: '=[1,2,3][]', errorType: 'parse', errorMessage: 'Parse error: "]"', valid: false },
      { definition: '=[1][', errorType: 'syntax', errorMessage: 'Missing closing bracket' },
      { definition: '={a: 1}[a]', errorType: 'syntax', errorMessage: '"a" not found' }
    ]
  }
}
