import { TestCaseInterface } from '../testType'

const namespaceId = '33333333-3333-4444-5555-333333333333'
const namespaceId2 = '33333333-3333-5555-5555-333333333333'

export const VariableCompleteTestCase: TestCaseInterface = {
  name: 'variableComplete',
  testCases: {
    pages: [
      {
        pageName: 'VariableCompletePage0',
        variables: [{ variableName: 'num0', definition: '=0' }]
      },
      {
        pageName: 'VariableCompletePage1',
        pageId: namespaceId,
        variables: [
          { variableName: 'num0', definition: '="0"' },
          { variableName: 'num1', definition: '=1' },
          { variableName: 'num2', definition: '=2' },
          { variableName: 'foobar', definition: '=3' }
        ]
      },
      {
        pageName: 'VariableCompletePage2',
        pageId: namespaceId2,
        variables: [
          { variableName: 'numa', definition: '=0' },
          { variableName: 'num0', definition: '=0' },
          { variableName: 'num0123', definition: '=0' }
        ]
      }
    ],
    completeTestCases: [
      {
        definitionWithCursor: '=num$',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'num' },
        namespaceId,
        firstCompletion: { name: 'num0', kind: 'variable' },
        completes: [{ definitionWithCursor: '=num0$' }]
      },
      {
        definitionWithCursor: '=3 > num$',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'num' },
        secondNonSpaceCodeFragment: { code: 'GreaterThan' },
        namespaceId,
        firstCompletion: {
          name: 'num1',
          kind: 'variable',
          flags: ['compareTypeMatched', 'name', 'nameStartsWith', 'defaultNamespace', 'variable']
        },
        completes: [{ definitionWithCursor: '=3 > num1$' }]
      },
      {
        definitionWithCursor: '=3 > num$',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'num' },
        secondNonSpaceCodeFragment: { code: 'GreaterThan', display: '> ' },
        namespaceId,
        firstCompletion: {
          name: 'num1',
          kind: 'variable',
          flags: ['compareTypeMatched', 'name', 'nameStartsWith', 'defaultNamespace', 'variable']
        },
        completes: [{ definitionWithCursor: '=3 > num1$' }]
      },
      {
        definitionWithCursor: '=3 > $',
        firstNonSpaceCodeFragment: { code: 'GreaterThan', display: '> ' },
        namespaceId,
        firstCompletion: {
          name: 'num1',
          kind: 'variable',
          flags: ['compareTypeMatched', 'defaultNamespace', 'variable']
        },
        completes: [{ definitionWithCursor: '=3 > num1$' }]
      },
      {
        definitionWithCursor: '=NUM$',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'NUM' },
        namespaceId,
        firstCompletion: { name: 'num0', kind: 'variable' },
        completes: [{ definitionWithCursor: '=num0$' }]
      },
      {
        definitionWithCursor: '=num $',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'num ' },
        namespaceId,
        firstCompletion: { name: 'num0', kind: 'variable' },
        completes: [{ definitionWithCursor: '=num0 $' }]
      },
      {
        definitionWithCursor: '=num0$',
        firstNonSpaceCodeFragment: { code: 'Variable', display: 'num0' },
        namespaceId,
        firstCompletion: { name: 'num0', kind: 'variable' },
        completes: [{ definitionWithCursor: '=num0$' }]
      },
      {
        definitionWithCursor: '=num$0',
        firstNonSpaceCodeFragment: { code: 'Variable', display: 'num0' },
        namespaceId,
        firstCompletion: { name: 'num0', kind: 'variable' },
        completes: [{ definitionWithCursor: '=num0$' }]
      },
      {
        definitionWithCursor: '= 1 + num$ + 123',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'num' },
        namespaceId,
        firstCompletion: { name: 'num0', kind: 'variable' },
        completes: [{ definitionWithCursor: '= 1 + num0$ + 123' }]
      },
      {
        definitionWithCursor: '= 1 + num0$ + 123',
        firstNonSpaceCodeFragment: { code: 'Variable', display: 'num0' },
        namespaceId,
        firstCompletion: { name: 'num0', kind: 'variable' },
        completes: [{ definitionWithCursor: '= 1 + num0$ + 123' }]
      },
      {
        definitionWithCursor: '= 1 + #CurrentBlock.num$ + 123',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'num' },
        namespaceId,
        firstCompletion: { name: 'num0', kind: 'variable' },
        completes: [{ definitionWithCursor: '= 1 + #CurrentBlock.num0$ + 123' }]
      },
      {
        definitionWithCursor: '= 1 + #CurrentBlock.num0$ + 123',
        firstNonSpaceCodeFragment: { code: 'Variable', display: 'num0' },
        namespaceId,
        firstCompletion: { name: 'num0', kind: 'variable' },
        completes: [{ definitionWithCursor: '= 1 + #CurrentBlock.num0$ + 123' }]
      },
      {
        definitionWithCursor: '= 1 + #CurrentBlock$ + 123',
        firstNonSpaceCodeFragment: { code: 'Block', display: '#CurrentBlock' },
        namespaceId,
        firstCompletion: {
          name: 'num0',
          kind: 'variable',
          flags: ['contextNamespace', 'defaultNamespace', 'blockNamespace', 'variable']
        },
        completes: [{ definitionWithCursor: '= 1 + #CurrentBlock.num0$ + 123' }]
      },
      {
        definitionWithCursor: '= 1 + #CurrentBlock.$ + 123',
        firstNonSpaceCodeFragment: { code: 'Dot' },
        secondNonSpaceCodeFragment: { code: 'Block', display: '#CurrentBlock' },
        namespaceId,
        firstCompletion: { name: 'num0', kind: 'variable', flags: ['chainNamespace', 'defaultNamespace', 'variable'] },
        completes: [{ definitionWithCursor: '= 1 + #CurrentBlock.num0$ + 123' }]
      },
      {
        definitionWithCursor: '= 1 + VariableCompletePage1.num$ + 123',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'num' },
        namespaceId,
        firstCompletion: { name: 'num0', kind: 'variable' },
        completes: [{ definitionWithCursor: '= 1 + VariableCompletePage1.num0$ + 123' }]
      },
      {
        definitionWithCursor: '= 1 + VariableCompletePage1.num0$ + 123',
        firstNonSpaceCodeFragment: { code: 'Variable', display: 'num0' },
        namespaceId,
        firstCompletion: { name: 'num0', kind: 'variable' },
        completes: [{ definitionWithCursor: '= 1 + VariableCompletePage1.num0$ + 123' }]
      },
      {
        definitionWithCursor: '= 1 + VariableCompletePage2.num01$ + 123',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'num01', namespaceId: namespaceId2 },
        firstCompletion: { name: 'num0123', kind: 'variable', fallbackValue: 'VariableCompletePage2.num0123' },
        completes: [{ definitionWithCursor: '= 1 + VariableCompletePage2.num0123$ + 123' }]
      },
      {
        definitionWithCursor: '= 1 + VariableCompletePage2.num0123$ + 123',
        firstNonSpaceCodeFragment: { code: 'Variable', display: 'num0123', namespaceId: namespaceId2 },
        firstCompletion: { name: 'num0123', kind: 'variable', fallbackValue: 'VariableCompletePage2.num0123' },
        completes: [{ definitionWithCursor: '= 1 + VariableCompletePage2.num0123$ + 123' }]
      },
      {
        definitionWithCursor: '= 1 + VariableCompletePage1$ + 123',
        firstNonSpaceCodeFragment: { code: 'Block', display: 'VariableCompletePage1' },
        namespaceId,
        firstCompletion: { name: 'num0', kind: 'variable' },
        completes: [{ definitionWithCursor: '= 1 + VariableCompletePage1.num0$ + 123' }]
      },
      {
        definitionWithCursor: '= 1 + VariableCompletePage1.$ + 123',
        firstNonSpaceCodeFragment: { code: 'Dot', display: '.' },
        secondNonSpaceCodeFragment: { code: 'Block' },
        firstCompletion: {
          name: 'num0',
          kind: 'variable',
          flags: ['chainNamespace', 'variable']
        },
        completes: [{ definitionWithCursor: '= 1 + VariableCompletePage1.num0$ + 123' }]
      }
    ]
  }
}
