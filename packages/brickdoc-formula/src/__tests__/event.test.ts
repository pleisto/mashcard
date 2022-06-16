import { interpret, parse, generateVariable } from '../grammar'
import { makeContext } from '../tests/testHelper'
import { buildTestCases, matchObject, trackTodo } from '../tests'
import { uuid } from '@brickdoc/active-support'

const [testCases] = buildTestCases(['blockEvent'])

describe('event', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeEach(async () => {
    ctx = await makeContext({
      ...testCases.options,
      uuidFunction: index => uuid(),
      initializeOptions: { domain: uuid() }
    })
  })

  trackTodo(it, testCases.eventTestCases)

  it.each(testCases.eventTestCases)('$jestTitle', async args => {
    jest.useRealTimers()
    const newCtx = { ...ctx, meta: ctx.buildMeta(args) }
    const parseResult = parse(newCtx)
    const tempT = await interpret({ ctx: newCtx, parseResult })
    const variable = generateVariable({ formulaContext: ctx.formulaContext, t: tempT })
    await variable.save()

    const resultBefore = await variable.t.task.variableValue
    expect(matchObject(resultBefore.result)).toStrictEqual(args.resultBefore)

    await args.event(newCtx)

    const resultAfter = await variable.t.task.variableValue
    expect(matchObject(resultAfter.result)).toStrictEqual(args.resultAfter)
    expect(variable.t.variableParseResult).toMatchObject(args.variableParseResultAfter ?? {})

    jest.clearAllTimers()
  })
})
