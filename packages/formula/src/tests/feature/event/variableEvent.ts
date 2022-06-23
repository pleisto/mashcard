import { buildInsertAndAwaitEvent, buildInsertEvent, generateUUIDs } from '../../testHelper'
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
        resultAfter: 0,
        event: async () => {}
      },
      {
        definition: '=VariableEventPage1.unknownVariable',
        resultBefore: '"unknownVariable" not found',
        resultAfter: '"unknownVariable" not found',
        event: async () => {}
      },
      {
        definition: '=num2+1',
        resultBefore: '"num2" not found',
        namespaceId: page0Id,
        resultAfter: 124,
        event: buildInsertEvent({ definition: '=123', name: 'num2', namespaceId: page0Id })
      },
      {
        definition: '=num2+1',
        resultBefore: '"num2" not found',
        namespaceId: page0Id,
        resultAfter: 'Loading...',
        resultAfterAsync: true,
        event: buildInsertEvent({ definition: '=SLEEP(123)', name: 'num2', namespaceId: page0Id })
      },
      {
        definition: '=num2+1',
        todoMessage: 'async event refactor',
        resultBefore: '"num2" not found',
        namespaceId: page0Id,
        resultAfter: 'Loading...',
        resultAfterAsync: true,
        event: buildInsertAndAwaitEvent({ definition: '=SLEEP(123)', name: 'num2', namespaceId: page0Id })
      }
    ]
  }
}
