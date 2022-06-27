import { OperatorType } from '../operator'

export const expressionOperator: OperatorType = {
  name: 'expression',
  expressionType: 'any',
  skipReturnEarlyCheck: true,
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs, rhs }) => {
    if (rhs!.type === 'Function' && lhs.type === 'Function') {
      return { type: 'Function', result: [...lhs.result, ...rhs!.result] }
    }

    return rhs!
  },
  testCases: {
    successTestCases: [
      { definition: '= 1; 2', result: 2 },
      { definition: '= (1; 2+1)', result: 3 },
      { definition: '= 1;\n2', result: 2 },
      { definition: '= 1\n;2', result: 2 },
      { definition: '= \n1;2\n', result: 2 },
      { definition: '= \n1\n+\n2\n', result: 3 },
      { definition: '=1; 2; (1+3)', result: 4 },
      { definition: '=ABS(1; 2; (1+3))', result: 4 },
      { definition: '=1; 2; 1/0; (1+3)', result: 4 },
      {
        definition: '= \n 1',
        result: 1,
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [{ code: 'Equal' }, { code: 'Space', display: ' \n ' }, { code: 'NumberLiteral' }]
          }
        ]
      }
    ],
    errorTestCases: [
      { definition: '= 1;', errorType: 'syntax', errorMessage: 'Missing expression' },
      { definition: '= 1\n2', errorType: 'parse', errorMessage: 'Not all input parsed: 2', valid: false },
      { definition: '=1; 2;', errorType: 'syntax', errorMessage: 'Missing expression' },
      { definition: '=;', errorType: 'syntax', errorMessage: 'Missing expression' },
      { definition: '=;123', errorType: 'parse', errorMessage: 'Parse error: ";"', valid: false }
    ]
  }
}
