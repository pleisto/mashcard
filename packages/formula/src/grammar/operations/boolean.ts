import { OperatorType } from '../operator'

export const booleanOperator: OperatorType = {
  name: 'boolean',
  expressionType: 'boolean',
  skipRhsCstParse: true,
  reverseLhsAndRhs: true,
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs }) => lhs,
  dynamicInterpretLhs: async ({ operators }) => {
    return { type: 'boolean', result: operators[0]!.image.toUpperCase() === 'TRUE' }
  },
  dynamicParseValidator: (cstVisitor, { image, codeFragments, type }) => {
    return { image, codeFragments: codeFragments.map(c => ({ ...c, type: 'boolean' })), type }
  },
  testCases: {
    successTestCases: [
      {
        definition: '=true',
        result: true,
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [{ code: 'Equal' }, { code: 'BooleanLiteral', display: 'true', type: 'boolean' }]
          }
        ]
      },
      { definition: '=True', result: true },
      { definition: '=false', result: false },
      {
        definition: '=FALSE',
        result: false,
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [{ code: 'Equal' }, { code: 'BooleanLiteral', display: 'FALSE', type: 'boolean' }]
          }
        ]
      }
    ],
    errorTestCases: [
      {
        definition: '=True + 1',
        errorType: 'type',
        errorMessage: ['errors.parse.mismatch.type', { expected: 'number,Cell', got: 'boolean' }]
      }
    ]
  }
}
