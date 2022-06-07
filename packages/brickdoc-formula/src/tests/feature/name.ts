import { TestCaseInterface } from '../testType'

const namespaceId = Symbol('nameCheck')

export const NameTestCase: TestCaseInterface = {
  name: 'nameCheck',
  testCases: {
    pages: [
      {
        pageName: 'NameCheck',
        pageId: namespaceId,
        variables: [{ definition: '=24', variableName: 'bar' }]
      }
    ],
    successTestCases: [{ definition: '="ok"', result: 'ok', name: 'ok', namespaceId }],
    errorTestCases: [
      {
        definition: '="bar"',
        errorType: 'name_unique',
        errorMessage: 'Name exist in same namespace',
        namespaceId,
        name: 'bar'
      },
      {
        definition: '="if"',
        errorType: 'name_check',
        errorMessage: 'Variable name is reserved',
        namespaceId,
        name: 'if'
      },
      {
        definition: '="in"',
        errorType: 'name_invalid',
        errorMessage: 'Variable name is not valid',
        namespaceId,
        name: 'in'
      },
      {
        definition: '="1asd"',
        errorType: 'name_invalid',
        errorMessage: 'Variable name is not valid',
        namespaceId,
        name: '1asd'
      }
    ]
  }
}
