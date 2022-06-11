import { TestCaseInterface } from '../testType'

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
      }
    ],
    completeTestCases: [
      {
        definitionWithCursor: '=BlockCompletE$',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'BlockCompletE' },
        namespaceId,
        firstCompletion: {
          name: 'BlockCompletePage1',
          kind: 'block',
          flags: ['name', 'nameStartsWith', 'defaultNamespace', 'block']
        },
        completes: [{ definitionWithCursor: '=BlockCompletePage1$' }]
      },
      {
        definitionWithCursor: '=BlockCompletE$',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'BlockCompletE' },
        firstCompletion: { name: 'BlockCompletePage1', kind: 'block', flags: ['name', 'nameStartsWith', 'block'] },
        completes: [
          { definitionWithCursor: '=BlockCompletePage1$' },
          { match: 'BlockCompletePage2 with space', definitionWithCursor: '="BlockCompletePage2 with space"$' }
        ]
      },
      {
        definitionWithCursor: '=1 + BlockCompletePage2$ + 1',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'BlockCompletePage2' },
        firstCompletion: {
          name: 'BlockCompletePage2 with space',
          kind: 'block',
          flags: ['name', 'nameStartsWith', 'block']
        },
        completes: [{ definitionWithCursor: '=1 + "BlockCompletePage2 with space"$ + 1' }]
      },
      {
        definitionWithCursor: '=1 + BlockCompletePage2 $+ 1',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'BlockCompletePage2 ' },
        firstCompletion: {
          name: 'BlockCompletePage2 with space',
          kind: 'block',
          flags: ['name', 'nameStartsWith', 'block']
        },
        completes: [{ definitionWithCursor: '=1 + "BlockCompletePage2 with space"$+ 1' }]
      },
      {
        definitionWithCursor: '=1 + BlockCompletePage2 $ + 1',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'BlockCompletePage2 ' },
        firstCompletion: {
          name: 'BlockCompletePage2 with space',
          kind: 'block',
          flags: ['name', 'nameStartsWith', 'block']
        },
        completes: [{ definitionWithCursor: '=1 + "BlockCompletePage2 with space"$ + 1' }]
      },
      {
        definitionWithCursor: '=BlockCompletePage1$',
        firstNonSpaceCodeFragment: { code: 'Block', display: 'BlockCompletePage1' },
        namespaceId,
        firstCompletion: {
          name: 'num0',
          kind: 'variable',
          flags: ['contextNamespace', 'defaultNamespace', 'blockNamespace', 'variable']
        },
        completes: [
          { definitionWithCursor: '=BlockCompletePage1.num0$' },
          { match: 'BlockCompletePage1', definitionWithCursor: '=BlockCompletePage1$' }
        ]
      },
      {
        definitionWithCursor: '=BlockCompletePage1.$',
        firstNonSpaceCodeFragment: { code: 'Dot' },
        secondNonSpaceCodeFragment: { code: 'Block', display: 'BlockCompletePage1' },
        namespaceId,
        firstCompletion: {
          name: 'num0',
          kind: 'variable',
          flags: ['chainNamespace', 'defaultNamespace', 'variable']
        },
        completes: [{ definitionWithCursor: '=BlockCompletePage1.num0$' }]
      }
    ]
  }
}
