import { TestCaseInterface } from '../testType'

const namespaceId = Symbol('async')

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
      { definition: '=SLEEP(123)', result: 123 },
      { definition: '=SLEEP(123)+1', result: 124 },
      { definition: '=1+SLEEP(123)', result: 124 },
      { definition: '=SLEEP( 123 )+SLEEP(1+1)', result: 125 },
      { definition: '=foo+1', result: 25, namespaceId }
    ]
  }
}
