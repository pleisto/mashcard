import { TestCaseInterface, DEFAULT_FIRST_NAMESPACEID } from '../testType'

const pageId = '22222222-2222-2222-2222-222222222222'
const fooId = '22222222-2222-3333-2222-222222222222'
const fooPlusId = '22222222-2222-4444-7777-222222222222'
const fooMaxId = '22222222-2222-5555-2222-222222222222'

export const VariableTestCase: TestCaseInterface = {
  name: 'variable',
  testCases: {
    pages: [
      {
        pageName: 'Variable',
        pageId,
        variables: [
          { definition: '=24', variableName: 'bar' },
          { definition: '=SLEEP(10)', variableName: 'foo', variableId: fooId },
          { definition: '=foo+1', variableName: 'fooPlus1', variableId: fooPlusId },
          {
            definition: '=fooPlus1+1',
            variableName: 'fooMax',
            variableId: fooMaxId,
            insertOptions: {}
          }
        ]
      }
    ],
    successTestCases: [
      {
        definition: '=foo',
        namespaceId: pageId,
        groupOptions: [{ name: 'complete', options: { name: 'bar', kind: 'variable' } }],
        result: 10,
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'blockDependencies', match: [pageId] },
          { key: 'variableDependencies', match: [{ namespaceId: pageId, variableId: fooId }] },
          { key: 'flattenVariableDependencies', match: [{ namespaceId: pageId, variableId: fooId }] },
          { key: 'nameDependencies', match: [{ name: 'foo', namespaceId: pageId }] }
        ]
      },
      {
        definition: '="foo"',
        namespaceId: pageId,
        result: 10,
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'blockDependencies', match: [pageId] },
          { key: 'nameDependencies', match: [{ name: 'foo', namespaceId: pageId }] }
        ]
      },
      {
        definition: `=#${pageId}.foo`,
        result: 10,
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'blockDependencies', match: [pageId] },
          { key: 'nameDependencies', match: [{ name: 'foo', namespaceId: pageId }] }
        ]
      },
      {
        definition: '=Variable.FOO',
        result: 10,
        label: 'Case insensitive',
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'blockDependencies', match: [pageId] },
          { key: 'nameDependencies', match: [{ name: 'foo', namespaceId: pageId }] }
        ]
      },
      {
        definition: '=#CurrentBlock.foo',
        result: 10,
        namespaceId: pageId,
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'blockDependencies', match: [pageId] },
          { key: 'nameDependencies', match: [{ name: 'foo', namespaceId: pageId }] }
        ]
      },
      {
        definition: '=Variable.foo',
        result: 10,
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'blockDependencies', match: [pageId] },
          { key: 'nameDependencies', match: [{ name: 'foo', namespaceId: pageId }] }
        ]
      },
      {
        definition: '=Variable.foo+Variable.bar',
        result: 34,
        expected: [
          { key: 'blockDependencies', match: [pageId] },
          {
            key: 'nameDependencies',
            match: [
              { name: 'foo', namespaceId: pageId },
              { name: 'bar', namespaceId: pageId }
            ]
          }
        ]
      },
      {
        definition: '=foo + bar',
        result: 34,
        namespaceId: pageId,
        expected: [
          { key: 'blockDependencies', match: [pageId] },
          {
            key: 'nameDependencies',
            match: [
              { name: 'foo', namespaceId: pageId },
              { name: 'bar', namespaceId: pageId }
            ]
          }
        ]
      },
      {
        definition: '=Variable.fooPlus1 + foo',
        namespaceId: pageId,
        result: 21,
        expected: [
          { key: 'blockDependencies', match: [pageId] },
          {
            key: 'variableDependencies',
            match: [
              { namespaceId: pageId, variableId: fooPlusId },
              { namespaceId: pageId, variableId: fooId }
            ]
          },
          {
            key: 'nameDependencies',
            match: [
              { name: 'fooPlus1', namespaceId: pageId },
              { name: 'foo', namespaceId: pageId }
            ]
          }
        ]
      },
      { definition: '= SLEEP(10)', result: 10 },
      {
        definition: '=Variable.fooMax',
        result: 12,
        expected: [
          { key: 'blockDependencies', match: [pageId] },
          { key: 'variableDependencies', match: [{ namespaceId: pageId, variableId: fooMaxId }] },
          {
            key: 'flattenVariableDependencies',
            match: [
              { namespaceId: pageId, variableId: fooId },
              { namespaceId: pageId, variableId: fooPlusId },
              { namespaceId: pageId, variableId: fooMaxId }
            ]
          },
          { key: 'nameDependencies', match: [{ name: 'fooMax', namespaceId: pageId }] }
        ]
      }
    ],
    errorTestCases: [
      {
        definition: `=Variable.baz`,
        errorType: 'deps',
        errorMessage: '"baz" not found',
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'nameDependencies', match: [{ name: 'baz', namespaceId: pageId }] },
          { key: 'blockDependencies', match: [pageId] }
        ]
      },
      {
        definition: `=#CurrentBlock.baz`,
        errorType: 'deps',
        errorMessage: '"baz" not found',
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'nameDependencies', match: [{ name: 'baz', namespaceId: DEFAULT_FIRST_NAMESPACEID }] },
          { key: 'blockDependencies', match: [DEFAULT_FIRST_NAMESPACEID] }
        ]
      },
      {
        definition: `=baz`,
        errorType: 'syntax',
        errorMessage: 'Unknown function baz',
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'nameDependencies', match: [{ name: 'baz', namespaceId: DEFAULT_FIRST_NAMESPACEID }] },
          { key: 'blockDependencies', match: [] }
        ]
      },
      {
        definition: '=fo',
        namespaceId: pageId,
        groupOptions: [{ name: 'complete', options: { name: 'bar', kind: 'variable' } }],
        errorType: 'syntax',
        errorMessage: 'Unknown function fo',
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'blockDependencies', match: [] },
          { key: 'nameDependencies', match: [{ name: 'fo', namespaceId: pageId }] }
        ]
      },
      {
        definition: '=fooPlus1',
        namespaceId: pageId,
        variableId: fooId,
        name: 'foo',
        errorType: 'circular_dependency',
        errorMessage: 'Circular dependency found'
      }
    ]
  }
}
