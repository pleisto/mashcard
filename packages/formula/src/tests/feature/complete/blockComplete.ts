import { TestCaseInterface } from '../../testType'

const namespaceId = Symbol('BlockComplete')

export const BlockCompleteTestCase: TestCaseInterface = {
  name: 'blockComplete',
  testCases: {
    pages: [
      {
        pageName: 'BlockCompletePage1',
        pageId: namespaceId,
        variables: [
          { variableName: 'num0', definition: '=0' },
          { variableName: 'num1', definition: '=1' }
        ]
      },
      {
        pageName: 'BlockCompletePage2 with space',
        variables: [
          { variableName: 'numa', definition: '=0' },
          { variableName: 'num0', definition: '=0' },
          { variableName: 'num0123', definition: '=0' }
        ]
      },
      {
        pageName: '1invalidBlockComplete Page 3'
      }
    ],
    completeTestCases: [
      {
        definition$: '=BlockCompletE$',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'BlockCompletE' },
        namespaceId,
        firstCompletion: {
          name: 'BlockCompletePage1',
          kind: 'block',
          flags: ['nameStartsWith', 'defaultNamespace', 'block']
        },
        completes: [{ definition$: '=BlockCompletePage1$' }]
      },
      {
        definition$: '=BlockCompletE$',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'BlockCompletE' },
        firstCompletion: { name: 'BlockCompletePage1', kind: 'block', flags: ['nameStartsWith', 'block'] },
        completes: [
          { definition$: '=BlockCompletePage1$' },
          { match: 'BlockCompletePage2 with space', definition$: '="BlockCompletePage2 with space"$' }
        ]
      },
      {
        definition$: '=1 + BlockCompletePage2$ + 1',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'BlockCompletePage2' },
        firstCompletion: {
          name: 'BlockCompletePage2 with space',
          kind: 'block',
          flags: ['nameStartsWith', 'block']
        },
        completes: [{ definition$: '=1 + "BlockCompletePage2 with space"$ + 1' }]
      },
      {
        definition$: '=1 + BlockCompletePage2 $+ 1',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'BlockCompletePage2 ' },
        firstCompletion: {
          name: 'BlockCompletePage2 with space',
          kind: 'block',
          flags: ['nameStartsWith', 'block']
        },
        completes: [{ definition$: '=1 + "BlockCompletePage2 with space"$+ 1' }]
      },
      {
        definition$: '=1 + BlockCompletePage2 $ + 1',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'BlockCompletePage2 ' },
        firstCompletion: {
          name: 'BlockCompletePage2 with space',
          kind: 'block',
          flags: ['nameStartsWith', 'block']
        },
        completes: [{ definition$: '=1 + "BlockCompletePage2 with space"$ + 1' }]
      },
      {
        definition$: '=1invalidBlockComplete$',
        todoMessage: 'invalid page name complete support [parseErrorOther1]',
        firstNonSpaceCodeFragment: { code: 'parseErrorOther1', display: 'invalidBlockComplete' },
        firstCompletion: { name: 'Default', flags: ['defaultNamespace', 'block'] },
        completes: [{ definition$: '=1invalidBlockCompleteDefault$' }]
      },
      {
        definition$: '=BlockCompletePage1$',
        firstNonSpaceCodeFragment: { code: 'Block', display: 'BlockCompletePage1' },
        namespaceId,
        firstCompletion: undefined,
        completes: []
      },
      {
        definition$: '=BlockCompletePage1.$',
        firstNonSpaceCodeFragment: { code: 'Dot' },
        secondNonSpaceCodeFragment: { code: 'Block', display: 'BlockCompletePage1' },
        namespaceId,
        firstCompletion: {
          name: 'num0',
          kind: 'variable',
          flags: ['chainNamespace', 'defaultNamespace', 'variable']
        },
        completes: [{ definition$: '=BlockCompletePage1.num0$' }]
      }
    ]
  }
}
