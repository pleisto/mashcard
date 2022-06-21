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
      { definition: '=true', result: true, expected: [{ key: 'codeFragments', matchType: 'toMatchSnapshot' }] },
      { definition: '=True', result: true },
      { definition: '=false', result: false, expected: [{ key: 'codeFragments', matchType: 'toMatchSnapshot' }] },
      { definition: '=FALSE', result: false }
    ],
    errorTestCases: [
      { definition: '=True + 1', errorType: 'type', errorMessage: 'Expected number,Cell but got boolean' }
    ]
  }
}
