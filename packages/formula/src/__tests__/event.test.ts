import { interpret, parse, generateVariable } from '../grammar'
import { makeContext } from '../tests/testHelper'
import { buildTestCases, matchObject, trackTodo } from '../tests'
import { uuid } from '@mashcard/active-support'
import { MashcardEventBus } from '@mashcard/schema'
import { fetchResult } from '../context'
import { EventNames } from '../tests/feature/event'

const [testCases] = buildTestCases(EventNames)

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

    const eventListeners = []
    const triggerTest = []

    if (args.triggerEvents) {
      for (const event of args.triggerEvents(newCtx)) {
        const f = jest.fn()
        const subscription = MashcardEventBus.subscribe(event.event, e => f(e.payload), {
          subscribeId: args.jestTitle,
          eventId: event.eventId
        })
        triggerTest.push({ f, event })
        eventListeners.push(subscription)
      }
    }

    await args.event(newCtx)

    for (const { f, event } of triggerTest) {
      const callLength = event.callLength ?? 1
      expect([event.event.eventType, f.mock.calls.length]).toEqual([event.event.eventType, callLength])
      if (callLength > 0) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect([event.event.eventType, f.mock.calls[0][0]]).toMatchObject([event.event.eventType, event.payload ?? {}])
      }
    }

    expect(variable.t.task.async).toBe(args.resultAfterAsync ?? false)
    const resultAfter = fetchResult(variable.t)

    expect(matchObject(resultAfter)).toStrictEqual(args.resultAfter ?? args.resultBefore)
    expect(variable.t.variableParseResult).toMatchObject(args.variableParseResultAfter ?? {})

    eventListeners.forEach(listener => listener.unsubscribe())
    jest.clearAllTimers()
  })
})
