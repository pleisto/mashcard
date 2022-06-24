import { generateUUIDs } from '../testHelper'
import { TestCaseInterface } from '../testType'

const [namespaceId] = generateUUIDs()

export const AsyncTestCase: TestCaseInterface = {
  name: 'async',
  testCases: {
    pages: [
      {
        pageName: 'Async',
        pageId: namespaceId,
        variables: [{ variableName: 'foo', definition: '=SLEEP(24)' }]
      }
    ],
    successTestCases: [
      { definition: '=SLEEP(123)', result: 123, expected: [{ key: 'async', match: true }] },
      { definition: '=SLEEP(123)+1', result: 124, expected: [{ key: 'async', match: true }] },
      { definition: '=1+SLEEP(123)', result: 124, expected: [{ key: 'async', match: true }] },
      { definition: '=SLEEP( 123 )+SLEEP(1+1)', result: 125, expected: [{ key: 'async', match: true }] },
      { definition: '=foo+1', result: 25, namespaceId, expected: [{ key: 'async', match: true }] },
      { definition: '=12', result: 12, expected: [{ key: 'async', match: false }] }
    ]
  }
}
