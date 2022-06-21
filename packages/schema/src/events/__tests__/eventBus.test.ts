import { MashcardEventBus } from '../eventBus'
import { event } from '../event'

describe('MashcardEventBus', () => {
  beforeEach(() => {
    MashcardEventBus.reset()
  })
  it('can subscribe and dispatch', () => {
    const testEvent = event<string>()('testEvent', payload => {
      return { id: payload }
    })

    const testResult = new Map<string, boolean>()

    MashcardEventBus.subscribe(testEvent, e => {
      testResult.set('testEventHit', true)
      testResult.set('testEventHitRight', e.id === 'right')
    })

    MashcardEventBus.subscribe(
      testEvent,
      e => {
        testResult.set('testEventHitMiddle', true)
      },
      { eventId: 'middle' }
    )

    expect(testEvent.toString()).toEqual('testEvent')

    expect(testResult.get('testEventHit')).not.toBe(true)
    expect(testResult.get('testEventHitRight')).not.toBe(true)

    MashcardEventBus.dispatch(testEvent('left'))

    expect(testResult.get('testEventHit')).toBe(true)
    expect(testResult.get('testEventHitRight')).not.toBe(true)

    MashcardEventBus.dispatch(testEvent('right'))

    expect(testResult.get('testEventHit')).toBe(true)
    expect(testResult.get('testEventHitRight')).toBe(true)

    expect(testResult.get('testEventHitMiddle')).not.toBe(true)
    MashcardEventBus.dispatch(testEvent('middle'))
    expect(testResult.get('testEventHitMiddle')).toBe(true)
  })

  it('can unsubscribe', () => {
    const testEvent = event<string>()('testEvent', payload => {
      return { id: payload }
    })

    const testResult = new Map<string, boolean>()

    const { unsubscribe } = MashcardEventBus.subscribe(testEvent, e => {
      testResult.set('testEventHit', true)
    })

    unsubscribe()
    MashcardEventBus.dispatch(testEvent(''))

    expect(testResult.get('testEventHit')).not.toBe(true)
  })

  it('can subscribe sticky event', () => {
    const testEvent = event<string>({ sticky: true })('testEvent', payload => {
      return { id: payload }
    })

    const testResult = new Map<string, boolean>()

    MashcardEventBus.dispatch(testEvent(''))

    MashcardEventBus.subscribe(testEvent, e => {
      testResult.set('testEventHit', true)
    })

    MashcardEventBus.subscribe(testEvent, e => {
      testResult.set('testEventSecondHit', true)
    })

    expect(testResult.get('testEventHit')).toBe(true)
    expect(testResult.get('testEventSecondHit')).not.toBe(true)
  })

  it('can dispatch subscriber in order of priority', () => {
    const priorityEvent = event<string>()('priorityEvent')

    let str = ''

    MashcardEventBus.subscribe(
      priorityEvent,
      e => {
        str += `b${e.payload}`
      },
      { priority: 10 }
    )

    MashcardEventBus.subscribe(
      priorityEvent,
      e => {
        str += `c${e.payload}`
      },
      { priority: 15 }
    )

    MashcardEventBus.subscribe(
      priorityEvent,
      e => {
        str += `a${e.payload}`
      },
      { priority: 5 }
    )

    MashcardEventBus.dispatch(priorityEvent('1'))

    expect(str).toEqual('a1b1c1')
  })

  it('define callback result type and check dispatch result', async () => {
    const subscribeAsyncIdEvent = event<number, Promise<number>>()('subscribeAsyncIdEvent')

    let counter = 0

    MashcardEventBus.subscribe(
      subscribeAsyncIdEvent,
      async (e: any) => {
        counter += 1

        await Promise.resolve(1)
        counter += 100

        return counter
      },
      { subscribeId: 'subscribe1' }
    )

    const event1 = subscribeAsyncIdEvent(0)

    const promise1 = MashcardEventBus.dispatch(event1)
    expect(counter).toEqual(1)

    const result = await Promise.all(promise1)

    expect(counter).toEqual(101)
    counter += 1000

    expect(result).toEqual([101])
  })

  it('can only subscribe once with same subscribeId', async () => {
    const subscribeIdEvent = event<number>()('subscribeIdEvent')

    let counter = 0

    MashcardEventBus.subscribe(
      subscribeIdEvent,
      e => {
        counter += e.payload as number
      },
      { subscribeId: 'subscribeA' }
    )

    MashcardEventBus.subscribe(
      subscribeIdEvent,
      e => {
        counter += (e.payload as number) * 2
      },
      { subscribeId: 'subscribeA' }
    )

    MashcardEventBus.subscribe(
      subscribeIdEvent,
      e => {
        counter += (e.payload as number) * 4
      },
      { subscribeId: 'subscribeB' }
    )

    MashcardEventBus.dispatch(subscribeIdEvent(1))

    expect(counter).toEqual(6)
  })
})
