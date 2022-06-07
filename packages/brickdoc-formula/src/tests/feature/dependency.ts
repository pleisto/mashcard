import { TestCaseInterface } from '../testType'

const namespaceId = '77777777-7777-4444-bbbb-111111111111'

export const DependencyTestCase: TestCaseInterface = {
  name: 'dependency',
  testCases: {
    pages: [
      {
        pageName: 'Dependency',
        pageId: namespaceId,
        variables: [
          { variableName: 'num0', definition: '=0' },
          { variableName: 'num1', definition: '=0' },
          { variableName: 'num2', definition: '=num1' },
          { variableName: 'num3', definition: '=num1+num0' },
          { variableName: 'num4', definition: '=num3+num2' },
          { variableName: 'num5', definition: '=num4+num0' }
        ]
      }
    ],
    dependencyTestCases: [
      {
        name: 'num0',
        namespaceId,
        testCases: [
          {
            definition: '=10',
            result: 10,
            expected: [
              { name: 'num3', namespaceId, match: 10 },
              { name: 'num4', namespaceId, match: 10 },
              { name: 'num5', namespaceId, match: 20 }
            ]
          },
          {
            definition: '=0',
            result: 0,
            expected: [
              { name: 'num3', namespaceId, match: 0 },
              { name: 'num4', namespaceId, match: 0 },
              { name: 'num5', namespaceId, match: 0 }
            ]
          }
        ]
      },
      {
        name: 'num1',
        namespaceId,
        todo: 'fix me',
        testCases: [
          {
            definition: '="123"',
            result: '123',
            expected: [
              { name: 'num2', namespaceId, match: '123' },
              { name: 'num3', namespaceId, match: 'Expected number,Cell but got string' },
              { name: 'num4', namespaceId, match: 'Expected number,Cell but got string' },
              { name: 'num5', namespaceId, match: 'Expected number,Cell but got string' }
            ]
          },
          {
            definition: '=0',
            result: 0,
            expected: [
              { name: 'num2', namespaceId, match: 0 },
              { name: 'num3', namespaceId, match: 0 },
              { name: 'num4', namespaceId, match: 'Expected number,Cell but got string' },
              { name: 'num5', namespaceId, match: 'Expected number,Cell but got string' }
            ]
          }
        ]
      },
      {
        name: 'num0',
        namespaceId,
        testCases: [
          {
            definition: '=err',
            result: 'Unknown function err',
            expected: [
              { name: 'num3', namespaceId, match: 'Unknown function err' },
              { name: 'num4', namespaceId, match: 'Unknown function err' },
              { name: 'num5', namespaceId, match: 'Unknown function err' }
            ]
          },
          {
            definition: '=0',
            result: 0,
            expected: [
              { name: 'num3', namespaceId, match: 0 },
              { name: 'num4', namespaceId, match: 0 },
              { name: 'num5', namespaceId, match: 0 }
            ]
          }
        ]
      }
    ]
  }
}
