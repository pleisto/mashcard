import { interpret, parse, generateVariable } from '../grammar'
import { buildEvent, makeContext } from '../tests/testHelper'
import { buildTestCases, EventNames, matchObject, trackTodo } from '../tests'
import { uuid } from '@mashcard/active-support'
import { MashcardEventBus } from '@mashcard/schema'
import { fetchResult } from '../context'

const [input] = buildTestCases(EventNames)

describe('event', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeEach(async () => {
    MashcardEventBus.reset()
    ctx = await makeContext({
      ...input.options,
      uuidFunction: index => uuid(),
      initializeOptions: { username: uuid() }
    })
  })

  trackTodo(it, input.eventTestCases)

  it.each(input.eventTestCases)('$jestTitle', async args => {
    const newCtx = { ...ctx, meta: ctx.buildMeta(args) }
    const parseResult = parse(newCtx)
    const triggerTest = []

    const eventListeners1 = []

    if (args.saveEvents) {
      for (const event of args.saveEvents(newCtx)) {
        const f = jest.fn()
        const subscription = MashcardEventBus.subscribe(event.event, e => f(e.payload), {
          subscribeId: args.jestTitle,
          eventId: event.eventId
        })
        triggerTest.push({ f, event, label: 'save' })
        eventListeners1.push(subscription)
      }
    }

    const tempT = await interpret({ ctx: newCtx, parseResult })
    const variable = generateVariable({ formulaContext: ctx.formulaContext, t: tempT })
    await variable.save()
    const resultBefore = await variable.t.task.variableValue

    eventListeners1.forEach(listener => listener.unsubscribe())

    expect(matchObject(resultBefore.result)).toStrictEqual(args.resultBefore)

    const eventListeners2 = []

    if (args.triggerEvents) {
      for (const event of args.triggerEvents(newCtx)) {
        const f = jest.fn()
        const subscription = MashcardEventBus.subscribe(event.event, e => f(e.payload), {
          subscribeId: args.jestTitle,
          eventId: event.eventId
        })
        triggerTest.push({ f, event, label: 'event' })
        eventListeners2.push(subscription)
      }
    }

    await buildEvent(args.events)(newCtx)

    eventListeners2.forEach(listener => listener.unsubscribe())

    for (const { f, event, label } of triggerTest) {
      const callLength = event.callLength ?? 1
      expect([label, event.event.eventType, f.mock.calls.length]).toEqual([label, event.event.eventType, callLength])
      if (callLength > 0) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect([label, event.event.eventType, f.mock.calls[0][0]]).toMatchObject([
          label,
          event.event.eventType,
          event.payload ?? {}
        ])
      }
    }

    expect(variable.t.task.async).toBe(args.resultAfterAsync ?? false)
    const resultAfter = fetchResult(variable.t)

    expect(matchObject(resultAfter)).toStrictEqual(args.resultAfter ?? args.resultBefore)
    expect(variable.t.variableParseResult).toMatchObject(args.variableParseResultAfter ?? {})
  })
})
