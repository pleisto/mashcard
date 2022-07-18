import { AnyTypeResult } from '../../type'
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
    if (!result || result.type === 'null') return { type: 'Array', meta: 'void', result: [] }
    const arrayArgs = result.result as unknown as AnyTypeResult[]
    return { type: 'Array', meta: extractSubType(arrayArgs), result: arrayArgs }
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
          { type: 'Array', meta: 'void', result: [] },
          { type: 'Record', meta: 'void', result: {} },
          { type: 'number', result: 123 },
          { type: 'null', result: null }
        ]
      }
    ],
    errorTestCases: [
      { definition: '=[', errorType: 'syntax', errorMessage: 'errors.parse.missing.token' },
      {
        definition: '=]',
        errorType: 'parse',
        errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '"]"' }],
        valid: false
      },
      { definition: '=[1', errorType: 'syntax', errorMessage: 'errors.parse.missing.token' },
      { definition: '=[1,', errorType: 'syntax', errorMessage: 'errors.parse.missing.token' },
      {
        definition: '=[1,]',
        errorType: 'syntax',
        errorMessage: 'errors.parse.mismatch.expression_count',
        groupOptions: [{ name: 'basicError' }]
      },
      { definition: '=[1,2', errorType: 'syntax', errorMessage: 'errors.parse.missing.token' }
    ]
  }
}
