import { OperatorType } from '../operator'

export const concatOperator: OperatorType = {
  name: 'concat',
  expressionType: 'string',
  lhsType: 'string',
  rhsType: 'string',
  interpret: async ({ lhs, rhs }) => {
    const lhsResult = lhs.result as string
    const rhsResult = rhs!.result as string

    return { result: lhsResult.concat(rhsResult), type: 'string' }
  },
  testCases: {
    successTestCases: [
      { definition: '= "a" & "b"', result: 'ab' },
      { definition: '= "a" & "b" & "c"', result: 'abc' },
      { definition: '= "" & ""', result: '' }
    ],
    errorTestCases: [
      {
        definition: '= 1 & "foo"',
        errorType: 'type',
        errorMessage: ['errors.parse.mismatch.type', { expected: 'string', got: 'number' }]
      },
      {
        definition: '= "foo" & 1',
        errorType: 'type',
        errorMessage: ['errors.parse.mismatch.type', { expected: 'string', got: 'number' }]
      }
    ]
  }
}
