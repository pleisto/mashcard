import { OperatorType } from '../operator'

export const nullOperator: OperatorType = {
  name: 'null',
  expressionType: 'null',
  skipRhsCstParse: true,
  reverseLhsAndRhs: true,
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs }) => lhs,
  dynamicInterpretLhs: async (args, operators, interpreter) => {
    return { type: 'null', result: null }
  },
  dynamicParseValidator: (cstVisitor, { image, codeFragments, type }) => {
    return { image, codeFragments: codeFragments.map(c => ({ ...c, type: 'null' })), type }
  },
  testCases: {
    successTestCases: [
      { definition: '=null', result: null, expected: [{ key: 'codeFragments', matchType: 'toMatchSnapshot' }] },
      { definition: '=Null', result: null }
    ],
    errorTestCases: [{ definition: '=null + 1', errorType: 'type', errorMessage: 'Expected number,Cell but got null' }]
  }
}
