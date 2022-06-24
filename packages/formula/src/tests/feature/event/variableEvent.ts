import { generateUUIDs } from '../../testHelper'
import { TestCaseInterface } from '../../testType'

const [page0Id] = generateUUIDs()

export const VariableEventTestCase: TestCaseInterface = {
  name: 'variableEvent',
  testCases: {
    pages: [
      {
        pageName: 'VariableEventPage1',
        pageId: page0Id,
        variables: [{ variableName: 'num0', definition: '=0' }]
      }
    ],
    eventTestCases: [
      {
        definition: '=VariableEventPage1.num0',
        resultBefore: 0,
        events: []
      },
      {
        definition: '=VariableEventPage1.unknownVariable',
        resultBefore: '"unknownVariable" not found',
        events: []
      },
      {
        definition: '=num2+1',
        resultBefore: '"num2" not found',
        namespaceId: page0Id,
        resultAfter: 124,
        events: [['variableInsertOnly', { definition: '=123', name: 'num2', namespaceId: page0Id }]]
      },
      {
        definition: '=num2+1',
        resultBefore: '"num2" not found',
        namespaceId: page0Id,
        resultAfter: 'Loading...',
        resultAfterAsync: true,
        events: [['variableInsertOnly', { definition: '=SLEEP(123)', name: 'num2', namespaceId: page0Id }]]
      },
      {
        definition: '=num2+1',
        todoMessage: 'async event refactor',
        resultBefore: '"num2" not found',
        namespaceId: page0Id,
        resultAfter: 'Loading...',
        resultAfterAsync: true,
        events: [['variableInsertAndAwait', { definition: '=SLEEP(123)', name: 'num2', namespaceId: page0Id }]]
      }
    ]
  }
}
