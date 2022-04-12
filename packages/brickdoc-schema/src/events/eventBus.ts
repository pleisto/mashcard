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

  private subscribers(event: Event): EventSubscriber[] {
    return [
      ...(this.eventSubscribers[event.type] ?? []),
      ...(this.eventIdSubscribers[event.type]?.[event.id ?? ''] ?? [])
    ].sort((a, b) => (a.config.priority ?? 0) - (b.config.priority ?? 0))
  }

  private consume(event: Event): void {
    const subscribers = this.subscribers(event)

    const consumable = subscribers.length > 0 || !event.configure.persist
    if (!consumable) return

    while ((this.eventsPool[event.type]?.length ?? 0) > 0) {
      const currentEvent = this.eventsPool[event.type]?.shift()

      if (currentEvent) {
        subscribers.forEach(s => {
          s.callback(currentEvent)
        })
      }
    }
  }

  public reset(): void {
    this.eventSubscribers = {}
    this.eventIdSubscribers = {}
    this.eventsPool = {}
  }

  public subscribe<T = {}>(
    eventType: EventType<T>,
    callback: EventCallback<T>,
    config: EventSubscribeConfig = {}
  ): EventSubscribed {
    const typeName = eventType.eventType
    const { eventId } = config
    let subscribers: EventSubscriber[]
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
    const subscriber: EventSubscriber = { config, callback }
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

    this.eventsPool[eventType.eventType]?.forEach(event => {
      this.consume(event)
    })

    return { unsubscribe }
  }

  public dispatch(event: Event): void {
    if (!this.eventsPool[event.type]) this.eventsPool[event.type] = []
    this.eventsPool[event.type]?.push(event)

    this.consume(event)
  }

  public static getInstance(): EventBus {
    if (this.instance === undefined) {
      this.instance = new EventBus()
    }
    return this.instance
  }
}

export const BrickdocEventBus = EventBus.getInstance()
