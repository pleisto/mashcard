import { FormulaVariableDependencyUpdated } from '../../../events'
import { FunctionContext } from '../../../type'
import { generateUUIDs } from '../../testHelper'
import { TestCaseInterface } from '../../testType'

const [page0Id, variableId, dependencyVariableId] = generateUUIDs()

export const VariableEventTestCase: TestCaseInterface = {
  name: 'variableEvent',
  testCases: {
    pages: [
      {
        pageName: 'VariableEventPage1',
        pageId: page0Id,
        variables: [{ variableName: 'num0', variableId, definition: '=0' }]
      }
    ],
    eventTestCases: [
      ...[
        {
          name: 'foobar',
          expected: [
            {
              fn: (ctx: FunctionContext) => ctx.formulaContext.getDefaultVariableName(page0Id, 'string'),
              match: 'str0'
            }
          ] as const
        },
        {
          name: 'str1',
          expected: [
            {
              fn: (ctx: FunctionContext) => ctx.formulaContext.getDefaultVariableName(page0Id, 'string'),
              match: 'str2'
            }
          ] as const
        }
      ].map(t => ({
        definition: '=1',
        resultBefore: 1,
        namespaceId: page0Id,
        events: [],
        ...t
      })),
      {
        definition: '=VariableEventPage1.num0',
        resultBefore: 0,
        events: []
      },
      {
        definition: '=VariableEventPage1.unknownVariable',
        resultBefore: { message: '"unknownVariable" not found', type: 'deps' },
        events: []
      },
      ...[
        { events: [['variableDelete', {}] as const] },
        { events: [['variableUpdateDefinition', { definition: '=1' }] as const] }
      ].map<NonNullable<TestCaseInterface['testCases']['eventTestCases']>[0]>(a => ({
        ...a,
        definition: '=num0+1',
        label: 'variable dependency',
        namespaceId: page0Id,
        variableId: dependencyVariableId,
        resultBefore: 1,
        saveEvents: ctx => [
          {
            event: FormulaVariableDependencyUpdated,
            eventId: `${ctx.formulaContext.domain}#${page0Id},${variableId}`,
            payload: { meta: [{ namespaceId: page0Id, variableId: dependencyVariableId }], id: variableId }
          }
        ],
        triggerEvents: ctx => [
          {
            event: FormulaVariableDependencyUpdated,
            eventId: `${ctx.formulaContext.domain}#${page0Id},${variableId}`,
            payload: { meta: [], id: variableId }
          }
        ]
      })),
      {
        definition: '=num2+1',
        resultBefore: { message: '"num2" not found', type: 'syntax' },
        namespaceId: page0Id,
        resultAfter: 124,
        events: [['variableInsertOnly', { definition: '=123', name: 'num2', namespaceId: page0Id }]]
      },
      {
        definition: '=num2+1',
        resultBefore: { message: '"num2" not found', type: 'syntax' },
        namespaceId: page0Id,
        resultAfter: 'Loading...',
        resultAfterAsync: true,
        events: [['variableInsertOnly', { definition: '=SLEEP(123)', name: 'num2', namespaceId: page0Id }]]
      },
      {
        definition: '=num2+1',
        todoMessage: 'async event refactor',
        resultBefore: { message: '"num2" not found', type: 'syntax' },
        namespaceId: page0Id,
        resultAfter: 'Loading...',
        resultAfterAsync: true,
        events: [['variableInsertAndAwait', { definition: '=SLEEP(123)', name: 'num2', namespaceId: page0Id }]]
      }
    ]
  }
}
