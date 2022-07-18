import { OperatorType } from '../operator'

export const nullOperator: OperatorType = {
  name: 'null',
  expressionType: 'null',
  skipRhsCstParse: true,
  reverseLhsAndRhs: true,
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs }) => lhs,
  dynamicInterpretLhs: async () => {
    return { type: 'null', result: null }
  },
  dynamicParseValidator: (cstVisitor, { image, codeFragments, type }) => {
    return { image, codeFragments: codeFragments.map(c => ({ ...c, type: 'null' })), type }
  },
  testCases: {
    successTestCases: [
      {
        definition: '=null',
        result: null,
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [{ code: 'Equal' }, { code: 'NullLiteral', display: 'null', type: 'null' }]
          }
        ]
      },
      { definition: '=Null', result: null }
    ],
    errorTestCases: [
      {
        definition: '=null + 1',
        errorType: 'type',
        errorMessage: ['errors.parse.mismatch.type', { expected: 'number,Cell', got: 'null' }]
      }
    ]
  }
}
