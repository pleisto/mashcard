import {
  Event,
  EventType,
  EventCallback,
  EventSubscribers,
  EventIdSubscribers,
  EventSubscriber,
  EventSubscribed,
  EventSubscribeConfig,
  EventsPool
} from './types'

class EventBus {
  private static instance?: EventBus = undefined
  private eventSubscribers: EventSubscribers = {}
  private eventIdSubscribers: EventIdSubscribers = {}
  private eventsPool: EventsPool = {}

  private subscribers<Payload, Result>(event: Event<Payload, Result>): Array<EventSubscriber<Payload, Result>> {
    return [
      ...(this.eventSubscribers[event.type] ?? []),
      ...(this.eventIdSubscribers[event.type]?.[event.id ?? ''] ?? [])
    ].sort((a, b) => (a.config.priority ?? 0) - (b.config.priority ?? 0))
  }

  private consume<Payload, Result>(event: Event<Payload, Result>): Result[] {
    const subscribers = this.subscribers<Payload, Result>(event)
    const results: Result[] = []

    const consumable = subscribers.length > 0 || !event.configure.sticky
    if (!consumable) return results

    while ((this.eventsPool[event.type]?.length ?? 0) > 0) {
      const currentEvent = this.eventsPool[event.type]?.shift()

      if (currentEvent) {
        subscribers.forEach(s => {
          const result = s.callback(currentEvent as Event<Payload, Result>)
          results.push(result)
        })
      }
    }
    return results
  }

  public reset(): void {
    this.eventSubscribers = {}
    this.eventIdSubscribers = {}
    this.eventsPool = {}
  }

  public subscribe<Payload = {}, Result = void>(
    eventType: EventType<Payload, Result>,
    callback: EventCallback<Payload, Result>,
    config: EventSubscribeConfig = {}
  ): EventSubscribed {
    const typeName = eventType.eventType
    const { eventId } = config
    let subscribers: Array<EventSubscriber<Payload, Result>>
    if (eventId) {
      if (!this.eventIdSubscribers[typeName]) {
        this.eventIdSubscribers[typeName] = {}
      }
      if (!this.eventIdSubscribers[typeName]![eventId]) {
        this.eventIdSubscribers[typeName]![eventId] = []
      }
      subscribers = this.eventIdSubscribers[typeName]![eventId]!
    } else {
      if (!this.eventSubscribers[typeName]) {
        this.eventSubscribers[typeName] = []
      }
      subscribers = this.eventSubscribers[typeName]!
    }
    const subscriber: EventSubscriber<Payload, Result> = { config, callback }
    if (subscriber.config.subscribeId) {
      const idx = subscribers.findIndex(s => s.config.subscribeId === subscriber.config.subscribeId)
      if (idx !== -1) {
        subscribers.splice(idx, 1)
      }
    }
    subscribers.push(subscriber)
    const unsubscribe = (): void => {
      const idx = subscribers.findIndex(s => s === subscriber)
      if (idx !== -1) {
        subscribers.splice(idx, 1)
      }
    }

    this.eventsPool[typeName]?.forEach(event => {
      this.consume<Payload, Result>(event as Event<Payload, Result>)
    })

    return { unsubscribe }
  }

  public dispatch<Payload = {}, Result = void>(event: Event<Payload, Result>): Result[] {
    if (!this.eventsPool[event.type]) this.eventsPool[event.type] = []
    this.eventsPool[event.type]?.push(event)

    return this.consume<Payload, Result>(event)
  }

  public static getInstance(): EventBus {
    if (this.instance === undefined) {
      this.instance = new EventBus()
    }
    return this.instance
  }
}

export const MashcardEventBus = EventBus.getInstance()
