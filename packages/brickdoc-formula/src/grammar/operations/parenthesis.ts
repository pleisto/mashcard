import { OperatorType } from '../operator'

export const parenthesisOperator: OperatorType = {
  name: 'parenthesis',
  expressionType: 'any',
  dynamicParseType: lhsType => lhsType,
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs }) => lhs,
  testCases: {
    successTestCases: [{ definition: '= ( 3 + 4 ) * 5 - 2', result: 33, groupOptions: [{ name: 'cst' }] }],
    errorTestCases: [
      {
        definition: '=()',
        errorType: 'parse',
        label: 'Empty parentheses',
        errorMessage: 'Parse error: ")"',
        valid: false
      },
      { definition: '=(', errorType: 'syntax', errorMessage: 'Missing closing token' },
      { definition: '=)', errorType: 'parse', errorMessage: 'Parse error: ")"', valid: false },
      { definition: '=(1', errorType: 'syntax', errorMessage: 'Missing closing token' }
    ]
  }
}
