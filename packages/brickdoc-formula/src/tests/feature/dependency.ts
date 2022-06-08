import { TestCaseInterface } from '../testType'

const parentPageNamespaceId = Symbol('parentPageNamespaceId')
const subPageNamespaceId = Symbol('subPageNamespaceId')

export const DependencyTestCase: TestCaseInterface = {
  name: 'dependency',
  testCases: {
    pages: [
      {
        pageName: 'DependencyParentPage',
        pageId: parentPageNamespaceId,
        variables: [
          { variableName: 'num0', definition: '=0' },
          { variableName: 'num1', definition: '=0' },
          { variableName: 'num2', definition: '=num1' },
          { variableName: 'num3', definition: '=num1+num0' },
          { variableName: 'num4', definition: '=num3+num2' },
          { variableName: 'num5', definition: '=num4+num0' },
          {
            variableName: 'var2',
            definition: '=DependencySubPage.var1',
            insertOptions: { ignoreSyntaxError: true, ignoreParseError: true },
            result: '"var0" not found'
          }
        ]
      },
      {
        pageName: 'DependencySubPage',
        pageId: subPageNamespaceId,
        variables: [
          { variableName: 'num0', definition: '=DependencyParentPage.num0', result: 0 },
          {
            variableName: 'var1',
            definition: '=DependencyParentPage.var0',
            insertOptions: { ignoreSyntaxError: true, ignoreParseError: true },
            result: '"var0" not found'
          }
        ]
      }
    ],
    dependencyTestCases: [
      {
        name: 'num0',
        namespaceId: parentPageNamespaceId,
        type: 'Variable',
        testCases: [
          {
            action: { name: 'removeVariable' },
            expected: [
              { name: 'num3', namespaceId: parentPageNamespaceId, match: 'Unknown function num0' },
              { name: 'num4', namespaceId: parentPageNamespaceId, match: 'Unknown function num0' },
              { name: 'num5', namespaceId: parentPageNamespaceId, match: 'Unknown function num0' },
              { name: 'num0', namespaceId: subPageNamespaceId, match: '"num0" not found' }
            ]
          }
        ]
      },
      {
        name: 'BLOCK',
        namespaceId: parentPageNamespaceId,
        type: 'Block',
        testCases: [
          {
            action: { name: 'removeBlock' },
            expected: [
              { name: 'num0', namespaceId: subPageNamespaceId, match: 'Unknown function DependencyParentPage' }
            ]
          }
        ]
      },
      {
        name: 'num0',
        namespaceId: parentPageNamespaceId,
        type: 'Variable',
        testCases: [
          {
            action: { name: 'updateDefinition', formula: { definition: '=10' }, result: 10 },
            expected: [
              { name: 'num3', namespaceId: parentPageNamespaceId, match: 10 },
              { name: 'num4', namespaceId: parentPageNamespaceId, match: 10 },
              { name: 'num5', namespaceId: parentPageNamespaceId, match: 20 },
              { name: 'num0', namespaceId: subPageNamespaceId, match: 10 }
            ]
          },
          {
            action: { name: 'updateDefinition', formula: { definition: '=0' }, result: 0 },
            expected: [
              { name: 'num3', namespaceId: parentPageNamespaceId, match: 0 },
              { name: 'num4', namespaceId: parentPageNamespaceId, match: 0 },
              { name: 'num5', namespaceId: parentPageNamespaceId, match: 0 },
              { name: 'num0', namespaceId: subPageNamespaceId, match: 0 }
            ]
          }
        ]
      },
      {
        name: 'num1',
        namespaceId: parentPageNamespaceId,
        type: 'Variable',
        testCases: [
          {
            action: { name: 'updateDefinition', formula: { definition: '="123"' }, result: '123' },
            expected: [
              { name: 'num2', namespaceId: parentPageNamespaceId, match: '123' },
              { name: 'num3', namespaceId: parentPageNamespaceId, match: 'Expected number,Cell but got string' },
              { name: 'num4', namespaceId: parentPageNamespaceId, match: 'Expected number,Cell but got string' },
              { name: 'num5', namespaceId: parentPageNamespaceId, match: 'Expected number,Cell but got string' }
            ]
          },
          {
            action: { name: 'updateDefinition', formula: { definition: '=0' }, result: 0 },
            expected: [
              { name: 'num2', namespaceId: parentPageNamespaceId, match: 0 },
              { name: 'num3', namespaceId: parentPageNamespaceId, match: 0 },
              { name: 'num4', namespaceId: parentPageNamespaceId, match: 0 },
              { name: 'num5', namespaceId: parentPageNamespaceId, match: 0 }
            ]
          }
        ]
      },
      {
        name: 'num0',
        namespaceId: parentPageNamespaceId,
        type: 'Variable',
        testCases: [
          {
            action: { name: 'updateDefinition', formula: { definition: '=err' }, result: 'Unknown function err' },
            expected: [
              { name: 'num3', namespaceId: parentPageNamespaceId, match: 'Unknown function err' },
              { name: 'num4', namespaceId: parentPageNamespaceId, match: 'Unknown function err' },
              { name: 'num5', namespaceId: parentPageNamespaceId, match: 'Unknown function err' },
              { name: 'num0', namespaceId: subPageNamespaceId, match: 'Unknown function err' }
            ]
          },
          {
            action: { name: 'updateDefinition', formula: { definition: '=0' }, result: 0 },
            expected: [
              { name: 'num3', namespaceId: parentPageNamespaceId, match: 0 },
              { name: 'num4', namespaceId: parentPageNamespaceId, match: 0 },
              { name: 'num5', namespaceId: parentPageNamespaceId, match: 0 },
              { name: 'num0', namespaceId: subPageNamespaceId, match: 0 }
            ]
          }
        ]
      },
      {
        name: 'num0',
        label: 'rename: num0 -> var0',
        namespaceId: parentPageNamespaceId,
        type: 'Variable',
        testCases: [
          {
            action: { name: 'updateDefinition', formula: { definition: '=10', name: 'var0' }, result: 10 },
            expected: [
              { name: 'num3', namespaceId: parentPageNamespaceId, match: 10, definition: '=num1+var0' },
              { name: 'num4', namespaceId: parentPageNamespaceId, match: 10, definition: '=num3+num2' },
              { name: 'num5', namespaceId: parentPageNamespaceId, match: 20, definition: '=num4+var0' },
              { name: 'num0', namespaceId: subPageNamespaceId, match: 10, definition: '=DependencyParentPage.var0' },
              { name: 'var2', namespaceId: parentPageNamespaceId, match: 10, definition: '=DependencySubPage.var1' },
              { name: 'var1', namespaceId: subPageNamespaceId, match: 10, definition: '=DependencyParentPage.var0' }
            ]
          },
          {
            action: { name: 'updateDefinition', formula: { definition: '=100', name: 'num0' }, result: 100 },
            expected: [
              { name: 'num3', namespaceId: parentPageNamespaceId, match: 100, definition: '=num1+num0' },
              { name: 'num4', namespaceId: parentPageNamespaceId, match: 100, definition: '=num3+num2' },
              { name: 'num5', namespaceId: parentPageNamespaceId, match: 200, definition: '=num4+num0' },
              { name: 'num0', namespaceId: subPageNamespaceId, match: 100, definition: '=DependencyParentPage.num0' },
              { name: 'var2', namespaceId: parentPageNamespaceId, match: 100, definition: '=DependencySubPage.var1' },
              { name: 'var1', namespaceId: subPageNamespaceId, match: 100, definition: '=DependencyParentPage.num0' }
            ]
          },
          {
            action: { name: 'removeVariable' },
            expected: [
              { name: 'num3', namespaceId: parentPageNamespaceId, match: 'Unknown function num0' },
              { name: 'num4', namespaceId: parentPageNamespaceId, match: 'Unknown function num0' },
              { name: 'num5', namespaceId: parentPageNamespaceId, match: 'Unknown function num0' },
              { name: 'num0', namespaceId: subPageNamespaceId, match: '"num0" not found' },
              { name: 'var2', namespaceId: parentPageNamespaceId, match: '"num0" not found' },
              { name: 'var1', namespaceId: subPageNamespaceId, match: '"num0" not found' }
            ]
          }
        ]
      }
    ]
  }
}
