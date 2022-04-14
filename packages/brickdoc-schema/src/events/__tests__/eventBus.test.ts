import { BrickdocEventBus } from '../eventBus'
import { event } from '../event'

describe('BrickdocEventBus', () => {
  beforeEach(() => {
    BrickdocEventBus.reset()
  })
  it('can subscribe and dispatch', () => {
    const testEvent = event<string>()('testEvent', payload => {
      return { id: payload }
    })

    const testResult = new Map<string, boolean>()

    BrickdocEventBus.subscribe(testEvent, e => {
      testResult.set('testEventHit', true)
      testResult.set('testEventHitRight', e.id === 'right')
    })

    BrickdocEventBus.subscribe(
      testEvent,
      e => {
        testResult.set('testEventHitMiddle', true)
      },
      { eventId: 'middle' }
    )

    expect(testEvent.toString()).toEqual('testEvent')

    expect(testResult.get('testEventHit')).not.toBe(true)
    expect(testResult.get('testEventHitRight')).not.toBe(true)

    BrickdocEventBus.dispatch(testEvent('left'))

    expect(testResult.get('testEventHit')).toBe(true)
    expect(testResult.get('testEventHitRight')).not.toBe(true)

    BrickdocEventBus.dispatch(testEvent('right'))

    expect(testResult.get('testEventHit')).toBe(true)
    expect(testResult.get('testEventHitRight')).toBe(true)

    expect(testResult.get('testEventHitMiddle')).not.toBe(true)
    BrickdocEventBus.dispatch(testEvent('middle'))
    expect(testResult.get('testEventHitMiddle')).toBe(true)
  })

  it('can unsubscribe', () => {
    const testEvent = event<string>()('testEvent', payload => {
      return { id: payload }
    })

    const testResult = new Map<string, boolean>()

    const { unsubscribe } = BrickdocEventBus.subscribe(testEvent, e => {
      testResult.set('testEventHit', true)
    })

    unsubscribe()
    BrickdocEventBus.dispatch(testEvent(''))

    expect(testResult.get('testEventHit')).not.toBe(true)
  })

  it('can subscribe sticky event', () => {
    const testEvent = event<string>({ sticky: true })('testEvent', payload => {
      return { id: payload }
    })

    const testResult = new Map<string, boolean>()

    BrickdocEventBus.dispatch(testEvent(''))

    BrickdocEventBus.subscribe(testEvent, e => {
      testResult.set('testEventHit', true)
    })

    BrickdocEventBus.subscribe(testEvent, e => {
      testResult.set('testEventSecondHit', true)
    })

    expect(testResult.get('testEventHit')).toBe(true)
    expect(testResult.get('testEventSecondHit')).not.toBe(true)
  })

  it('can dispatch subscriber in order of priority', () => {
    const priorityEvent = event<string>()('priorityEvent')

    let str = ''

    BrickdocEventBus.subscribe(
      priorityEvent,
      e => {
        str += `b${e.payload}`
      },
      { priority: 10 }
    )

    BrickdocEventBus.subscribe(
      priorityEvent,
      e => {
        str += `c${e.payload}`
      },
      { priority: 15 }
    )

    BrickdocEventBus.subscribe(
      priorityEvent,
      e => {
        str += `a${e.payload}`
      },
      { priority: 5 }
    )

    BrickdocEventBus.dispatch(priorityEvent('1'))

    expect(str).toEqual('a1b1c1')
  })

  it('can only subscribe once with same subscribeId', () => {
    const subscribeIdEvent = event<number>()('subscribeIdEvent')

    let counter = 0

    BrickdocEventBus.subscribe(
      subscribeIdEvent,
      e => {
        counter += e.payload as number
      },
      { subscribeId: 'subscribeA' }
    )

    BrickdocEventBus.subscribe(
      subscribeIdEvent,
      e => {
        counter += (e.payload as number) * 2
      },
      { subscribeId: 'subscribeA' }
    )

    BrickdocEventBus.subscribe(
      subscribeIdEvent,
      e => {
        counter += (e.payload as number) * 4
      },
      { subscribeId: 'subscribeB' }
    )

    BrickdocEventBus.dispatch(subscribeIdEvent(1))

    expect(counter).toEqual(6)
  })
})
