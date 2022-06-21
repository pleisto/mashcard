import { CodeFragment, ErrorMessage, RecordResult } from '../../types'
import { codeFragment2string } from '../convert'
import { OperatorType } from '../operator'
import { extractSubType } from '../util'

export const recordOperator: OperatorType = {
  name: 'record',
  expressionType: 'Record',
  skipReturnEarlyCheck: true,
  dynamicInterpretLhs: async () => ({ type: 'Record', subType: 'void', result: {} }),
  lhsType: 'any',
  rhsType: 'any',
  parseRhs: ({
    rhsCodeFragments,
    operatorTokenCodeFragments,
    rhsTokenCodeFragments,
    operatorTokenImage,
    rhsTokenImage
  }) => {
    const nameDuplicateErrors: ErrorMessage[] = []
    const keyFragments = rhsTokenCodeFragments[0]
    if (keyFragments) {
      const key = codeFragment2string(keyFragments)
      const keyArray = rhsCodeFragments.map(c => codeFragment2string(c))
      if (key && keyArray.includes(key)) {
        nameDuplicateErrors.push({ message: 'Record key duplicated', type: 'syntax' })
      }
    }

    const codeFragments: CodeFragment[] = [
      ...rhsTokenCodeFragments.map(c => ({ ...c, errors: [...nameDuplicateErrors, ...c.errors] })),
      ...operatorTokenCodeFragments
    ]
    const images: string[] = [rhsTokenImage, operatorTokenImage]

    return {
      codeFragments,
      image: images.join(''),
      type: 'any'
    }
  },
  interpret: async ({ lhs, rhs }) => {
    const { result: lhsResult, type, subType } = lhs as RecordResult
    const {
      result: { key, value }
    } = rhs as RecordResult

    return { type, subType, result: { ...lhsResult, [key.result as string]: value } }
  },
  packageInterpretResult: ({ result: inputResult }) => {
    const result = inputResult as RecordResult['result']
    return { type: 'Record', subType: extractSubType(Object.values(result)), result }
  },
  testCases: {
    pages: [{ pageName: 'Record', variables: [{ variableName: 'bar', definition: '=123' }] }],
    successTestCases: [
      { definition: '={}', result: {} },
      { definition: '={"fo o": 123}', result: { 'fo o': { type: 'number', result: 123 } } },
      { definition: '={1: 123}', label: 'number as key', result: { '1': { type: 'number', result: 123 } } },
      {
        definition: '={"foo": 1, bar: "baz", bool: true, nullz: null, var: Record.bar, obj: {}, array: [1]}',
        result: {
          foo: { type: 'number', result: 1 },
          bar: { type: 'string', result: 'baz' },
          bool: { type: 'boolean', result: true },
          nullz: { type: 'null', result: null },
          var: { type: 'number', result: 123 },
          obj: { type: 'Record', subType: 'void', result: {} },
          array: { type: 'Array', subType: 'number', result: [{ type: 'number', result: 1 }] }
        }
      }
    ],
    errorTestCases: [
      { definition: '={', errorType: 'syntax', errorMessage: 'Missing closing token' },
      { definition: '=}', errorType: 'parse', errorMessage: 'Parse error: "}"', valid: false },
      { definition: '={a}', errorType: 'parse', errorMessage: 'TODO mismatch token recordField', valid: false },
      { definition: '={a', errorType: 'syntax', errorMessage: 'Missing closing token' },
      { definition: '={a: }', errorType: 'syntax', errorMessage: 'Missing expression' },
      { definition: '={a: 1', errorType: 'syntax', errorMessage: 'Missing closing token' },
      { definition: '={"foo":}', errorType: 'syntax', errorMessage: 'Missing expression' },
      { definition: '={a: 1, a: []}', errorType: 'syntax', errorMessage: 'Record key duplicated' },
      { definition: '={a: 1, "a": 2}', errorType: 'syntax', errorMessage: 'Record key duplicated' },
      { definition: '={null: 1}', errorType: 'syntax', label: 'todo null key', errorMessage: 'Missing closing token' },
      {
        definition: '={true: true}',
        errorType: 'syntax',
        label: 'todo null key',
        errorMessage: 'Missing closing token'
      }
    ]
  }
}
