import { AnyTypeResult } from '../../type'
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
      return { type: 'Error', result: { message: ['errors.interpret.not_found.key', { key }], type: 'runtime' } }
    }
  }

  if (result.type === 'Array') {
    const number = Number(key)
    if (isNaN(number)) {
      return { type: 'Error', result: { message: `Need a number: ${key}`, type: 'syntax' } }
    } else {
      return (
        result.result[number - 1] || {
          type: 'Error',
          result: { message: `Index ${number} out of bounds`, type: 'runtime' }
        }
      )
    }
  }

  if (result.type === 'Reference') {
    return { type: 'Reference', result: { ...result.result, attribute: key } }
  }

  return { type: 'Error', result: { message: `Access not supported for ${result.type}`, type: 'runtime' } }
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
      { definition: '=[1,2,3][0]', result: { message: 'Index 0 out of bounds', type: 'runtime' } },
      { definition: '=[][1]', result: { message: 'Index 1 out of bounds', type: 'runtime' } },
      { definition: '={a: 1}["a" & ""]', result: 1 },
      {
        definition: '={a: 1}[1+1]',
        result: { message: ['errors.interpret.not_found.key', { key: '2' }], type: 'runtime' }
      },
      {
        definition: '={a: 1}["b"]',
        result: { message: ['errors.interpret.not_found.key', { key: 'b' }], type: 'runtime' }
      },
      {
        definition: '={}["a"]',
        result: { message: ['errors.interpret.not_found.key', { key: 'a' }], type: 'runtime' }
      },
      {
        definition: '=1[1]',
        label: 'TODO check',
        result: { message: 'Access not supported for number', type: 'runtime' }
      },
      {
        definition: '="123"[1]',
        label: 'TODO check',
        result: { message: 'Access not supported for string', type: 'runtime' }
      },
      { definition: '=[2, "foo", true][2]', result: 'foo' },
      { definition: '=[2, "foo", true]["2"]', result: 'foo' },
      { definition: '=[2, "foo", true][1]+1 * 12', result: 14 }
    ],
    errorTestCases: [
      {
        definition: '=[1,2,3][]',
        errorType: 'parse',
        errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '"]"' }],
        valid: false
      },
      {
        definition: '=[1][',
        errorType: 'syntax',
        errorMessage: 'errors.parse.missing.closing_bracket',
        groupOptions: [{ name: 'basicError' }]
      },
      { definition: '={a: 1}[a]', errorType: 'syntax', errorMessage: '"a" not found' }
    ]
  }
}
