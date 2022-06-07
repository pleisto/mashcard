import { TestCaseInterface, DEFAULT_FIRST_NAMESPACEID } from '../testType'

const pageId = '22222222-2222-2222-2222-222222222222'

const num0Id = '44444444-4444-5555-0000-222222222222'
const num1Id = '44444444-4444-5555-1111-222222222222'
const num2Id = '44444444-4444-5555-2222-222222222222'
const num3Id = '44444444-4444-5555-3333-222222222222'
const num4Id = '44444444-4444-5555-4444-222222222222'
const num5Id = '44444444-4444-5555-5555-222222222222'

export const VariableTestCase: TestCaseInterface = {
  name: 'variable',
  testCases: {
    pages: [
      {
        pageName: 'Variable',
        pageId,
        variables: [
          { variableName: 'num0', definition: '=0', variableId: num0Id },
          { variableName: 'num1', definition: '=0', variableId: num1Id },
          { variableName: 'num2', definition: '=num1', variableId: num2Id },
          { variableName: 'num3', definition: '=num1+num0', variableId: num3Id },
          { variableName: 'num4', definition: '=num3+num2', variableId: num4Id },
          { variableName: 'num5', definition: '=num4+num0', variableId: num5Id }
        ]
      }
    ],
    successTestCases: [
      {
        definition: '=num1',
        namespaceId: pageId,
        groupOptions: [{ name: 'complete', options: { name: 'num0', kind: 'variable' } }],
        result: 0,
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'blockDependencies', match: [pageId] },
          { key: 'variableDependencies', match: [{ namespaceId: pageId, variableId: num1Id }] },
          { key: 'flattenVariableDependencies', match: [{ namespaceId: pageId, variableId: num1Id }] },
          { key: 'nameDependencies', match: [{ name: 'num1', namespaceId: pageId }] }
        ]
      },
      {
        definition: '="num1"',
        namespaceId: pageId,
        result: 0,
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'blockDependencies', match: [pageId] },
          { key: 'nameDependencies', match: [{ name: 'num1', namespaceId: pageId }] }
        ]
      },
      {
        definition: `=#${pageId}.num1`,
        result: 0,
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'blockDependencies', match: [pageId] },
          { key: 'nameDependencies', match: [{ name: 'num1', namespaceId: pageId }] }
        ]
      },
      {
        definition: '=Variable.NUM1',
        result: 0,
        label: 'Case insensitive',
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'blockDependencies', match: [pageId] },
          { key: 'nameDependencies', match: [{ name: 'num1', namespaceId: pageId }] }
        ]
      },
      {
        definition: '=#CurrentBlock.num1',
        result: 0,
        namespaceId: pageId,
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'blockDependencies', match: [pageId] },
          { key: 'nameDependencies', match: [{ name: 'num1', namespaceId: pageId }] }
        ]
      },
      {
        definition: '=Variable.num1',
        result: 0,
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'blockDependencies', match: [pageId] },
          { key: 'nameDependencies', match: [{ name: 'num1', namespaceId: pageId }] }
        ]
      },
      {
        definition: '=Variable.num1+Variable.num0',
        result: 0,
        expected: [
          { key: 'blockDependencies', match: [pageId] },
          {
            key: 'nameDependencies',
            match: [
              { name: 'num1', namespaceId: pageId },
              { name: 'num0', namespaceId: pageId }
            ]
          }
        ]
      },
      {
        definition: '=num1 + num0',
        result: 0,
        namespaceId: pageId,
        expected: [
          { key: 'blockDependencies', match: [pageId] },
          {
            key: 'nameDependencies',
            match: [
              { name: 'num1', namespaceId: pageId },
              { name: 'num0', namespaceId: pageId }
            ]
          }
        ]
      },
      {
        definition: '=Variable.num3 + num1',
        namespaceId: pageId,
        result: 0,
        expected: [
          { key: 'blockDependencies', match: [pageId] },
          {
            key: 'variableDependencies',
            match: [
              { namespaceId: pageId, variableId: num3Id },
              { namespaceId: pageId, variableId: num1Id }
            ]
          },
          {
            key: 'nameDependencies',
            match: [
              { name: 'num3', namespaceId: pageId },
              { name: 'num1', namespaceId: pageId }
            ]
          }
        ]
      },
      {
        definition: '=num4 + num5 + num0',
        namespaceId: pageId,
        result: 0,
        expected: [
          {
            key: 'variableDependencies',
            match: [num4Id, num5Id, num0Id].map(id => ({ namespaceId: pageId, variableId: id }))
          },
          {
            key: 'flattenVariableDependencies',
            match: [num1Id, num0Id, num3Id, num2Id, num4Id, num5Id].map(id => ({ namespaceId: pageId, variableId: id }))
          }
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
        groupOptions: [{ name: 'complete', options: { name: 'num0', kind: 'variable' } }],
        errorType: 'syntax',
        errorMessage: 'Unknown function fo',
        expected: [
          { key: 'codeFragments', matchType: 'toMatchSnapshot' },
          { key: 'blockDependencies', match: [] },
          { key: 'nameDependencies', match: [{ name: 'fo', namespaceId: pageId }] }
        ]
      },
      {
        definition: '=num5',
        namespaceId: pageId,
        variableId: num0Id,
        name: 'num0',
        errorType: 'circular_dependency',
        errorMessage: 'Circular dependency found'
      },
      {
        definition: '=num4',
        namespaceId: pageId,
        variableId: num0Id,
        name: 'num0',
        errorType: 'circular_dependency',
        errorMessage: 'Circular dependency found'
      },
      {
        definition: '=IF(false, 1, num4)',
        namespaceId: pageId,
        variableId: num0Id,
        name: 'num0',
        errorType: 'circular_dependency',
        errorMessage: 'Circular dependency found'
      }
    ]
  }
}
