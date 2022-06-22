import { generateVariable, interpret, parse } from '../../grammar'
import { FunctionContext, VariableInterface } from '../../types'
import { BaseTestCase, TestCaseInterface } from '../testType'

const page0Id = '44444444-5555-aaaa-7777-444444444444'

const interpretVariable = async (ctx: FunctionContext): Promise<VariableInterface> => {
  const parseResult = parse(ctx)
  const tempT = await interpret({ ctx, parseResult })
  const variable = generateVariable({ formulaContext: ctx.formulaContext, t: tempT })
  return variable
}

const buildInsertEvent: (
  args: BaseTestCase<{}>
) => NonNullable<TestCaseInterface['testCases']['eventTestCases']>[0]['event'] = args => {
  return async ctx => {
    const newCtx = { ...ctx, meta: ctx.buildMeta(args) }
    const variable = await interpretVariable(newCtx)
    await variable.save()
  }
}

const buildInsertAndAwaitEvent: (
  args: BaseTestCase<{}>
) => NonNullable<TestCaseInterface['testCases']['eventTestCases']>[0]['event'] = args => {
  return async ctx => {
    const newCtx = { ...ctx, meta: ctx.buildMeta(args) }
    const variable = await interpretVariable(newCtx)
    await variable.t.task.variableValue
    await variable.save()
  }
}

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
