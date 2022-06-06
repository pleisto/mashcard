import { DEFAULT_FIRST_NAMESPACEID } from '../../tests/testType'
import { mockBlock } from '../../tests/testMock'
import { OperatorType } from '../operator'

const pageId = '11111111-1111-1111-1111-111111111111'

export const blockOperator: OperatorType = {
  name: 'block',
  expressionType: 'Block',
  dynamicParseType: lhsType => lhsType,
  lhsType: 'any',
  rhsType: 'any',
  dynamicInterpretLhs: (args, operators, interpreter) => {
    const op = operators?.[0]
    if (!op) throw new Error('unsupported expression')
    const namespaceId = op.tokenType.name === 'CurrentBlock' ? interpreter.ctx.meta.namespaceId : op.image
    const block = interpreter.ctx.formulaContext.findBlockById(namespaceId)

    if (block) {
      return { type: 'Block', result: block }
    }

    return { type: 'Error', result: `Block ${namespaceId} not found`, errorKind: 'runtime' }
  },
  interpret: async ({ lhs }) => lhs,
  testCases: {
    pages: [{ pageName: 'Block', pageId }],
    successTestCases: [
      {
        definition: '=Block',
        result: mockBlock('Block', pageId),
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'nameDependencies', match: [] },
          { key: 'blockDependencies', match: [pageId] }
        ]
      },
      {
        definition: '=#CurrentBlock',
        result: mockBlock('Block', pageId),
        namespaceId: pageId,
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'nameDependencies', match: [] },
          { key: 'blockDependencies', match: [pageId] }
        ]
      }
    ],
    errorTestCases: [
      {
        definition: '=UnknownBlock',
        errorType: 'syntax',
        errorMessage: 'Unknown function UnknownBlock',
        expected: [
          { key: 'nameDependencies', match: [{ namespaceId: DEFAULT_FIRST_NAMESPACEID, name: 'UnknownBlock' }] }
        ]
      }
    ]
  }
}
