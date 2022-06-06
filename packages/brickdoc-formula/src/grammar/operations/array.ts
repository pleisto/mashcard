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
  },
  testCases: {
    pages: [{ pageName: 'Array', variables: [{ variableName: 'bar', definition: '=123' }] }],
    successTestCases: [
      { definition: '=[]', result: [] },
      { definition: '=[1]', result: [{ type: 'number', result: 1 }] },
      {
        definition: '=[2, "foo", true, [], {}, Array.bar, null]',
        result: [
          { type: 'number', result: 2 },
          { type: 'string', result: 'foo' },
          { type: 'boolean', result: true },
          { type: 'Array', subType: 'void', result: [] },
          { type: 'Record', subType: 'void', result: {} },
          { type: 'number', result: 123 },
          { type: 'null', result: null }
        ]
      }
    ],
    errorTestCases: [
      { definition: '=[', errorType: 'syntax', errorMessage: 'Missing closing token' },
      { definition: '=]', errorType: 'parse', errorMessage: 'Parse error: "]"', valid: false },
      { definition: '=[1', errorType: 'syntax', errorMessage: 'Missing closing token' },
      { definition: '=[1,', errorType: 'syntax', errorMessage: 'Missing closing token' },
      { definition: '=[1,]', errorType: 'syntax', errorMessage: 'Expression count mismatch' },
      { definition: '=[1,2', errorType: 'syntax', errorMessage: 'Missing closing token' }
    ]
  }
}
