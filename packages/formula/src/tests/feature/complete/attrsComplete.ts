import { generateUUIDs } from '../../testHelper'
import { TestCaseInterface } from '../../testType'

const [namespaceId] = generateUUIDs()

export const AttrsCompleteTestCase: TestCaseInterface = {
  name: 'attrsComplete',
  testCases: {
    pages: [
      {
        pageName: 'AttrsCompletePage0',
        pageId: namespaceId,
        variables: [{ variableName: 'num0', definition: '=0' }]
      }
    ],
    attrsCompleteTestCases: [
      {
        definition: '=num0',
        namespaceId,
        expected: [
          {
            code: 'Variable',
            matchType: 'toMatchObject',
            match: [{ kind: 'Variable' }, { kind: 'variable', name: 'num0' }]
          }
        ]
      },
      {
        definition: '=ABS(-1)',
        expected: [
          {
            code: 'Function',
            matchType: 'toMatchObject',
            match: [{ kind: 'Function' }, { kind: 'function', name: 'ABS' }]
          }
        ]
      },
      {
        definition: '=core::ABS(-1)',
        expected: [
          {
            code: 'FunctionGroup',
            matchType: 'toMatchObject',
            match: [{ kind: 'Function' }, { kind: 'function', name: 'ABS' }]
          }
        ]
      }
    ]
  }
}
