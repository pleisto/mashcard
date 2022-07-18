import { OperatorType } from '../operator'

export const notOperator: OperatorType = {
  name: 'not',
  expressionType: 'boolean',
  skipRhsCstParse: true,
  reverseLhsAndRhs: true,
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs }) => {
    return { type: 'boolean', result: !lhs.result }
  },
  testCases: {
    successTestCases: [
      { definition: '= !true', result: false },
      { definition: '=!not 1', result: true },
      { definition: '= ! not ! false', result: true },
      { definition: '= !false', result: true },
      { definition: '=!123', result: false }
    ],
    errorTestCases: [
      {
        definition: '=!1+1',
        errorType: 'type',
        errorMessage: ['errors.parse.mismatch.type', { expected: 'number,Cell', got: 'boolean' }]
      },
      {
        definition: '=!',
        errorType: 'parse',
        errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '""' }],
        valid: false
      }
    ]
  }
}
