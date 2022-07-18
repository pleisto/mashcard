import { OperatorType } from '../operator'

export const parenthesisOperator: OperatorType = {
  name: 'parenthesis',
  expressionType: 'any',
  dynamicParseType: lhsType => lhsType,
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs }) => lhs,
  testCases: {
    successTestCases: [
      { definition: '= ( 3 + 4 ) * 5 - 2', result: 33, expressionType: 'number', groupOptions: [{ name: 'cst' }] }
    ],
    errorTestCases: [
      {
        definition: '=()',
        errorType: 'parse',
        label: 'Empty parentheses',
        errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '")"' }],
        valid: false
      },
      { definition: '=(', errorType: 'syntax', errorMessage: 'errors.parse.missing.token' },
      {
        definition: '=)',
        errorType: 'parse',
        errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '")"' }],
        valid: false
      },
      { definition: '=(1', errorType: 'syntax', errorMessage: 'errors.parse.missing.token' }
    ]
  }
}
