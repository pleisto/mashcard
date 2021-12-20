import {
  Event,
  EventType,
  EventCallback,
  EventSubscribers,
  EventIdSubscribers,
  EventSubscriber,
  EventSubscribed,
  EventSubscribeConfig
} from './types'

class EventBus {
  private static instance?: EventBus = undefined
  private eventSubscribers: EventSubscribers
  private eventIdSubscribers: EventIdSubscribers

  constructor() {
    this.eventSubscribers = {}
    this.eventIdSubscribers = {}
  }

  public subscribe(eventType: EventType, callback: EventCallback, config: EventSubscribeConfig = {}): EventSubscribed {
    const typeName = eventType.eventType
    const { eventId } = config
    let subscribers: EventSubscriber[]
    if (eventId) {
      if (!this.eventIdSubscribers[typeName]) {
        this.eventIdSubscribers[typeName] = {}
      }
      if (!this.eventIdSubscribers[typeName][eventId]) {
        this.eventIdSubscribers[typeName][eventId] = []
      }
      subscribers = this.eventIdSubscribers[typeName][eventId]
    } else {
      if (!this.eventSubscribers[typeName]) {
        this.eventSubscribers[typeName] = []
      }
      subscribers = this.eventSubscribers[typeName]
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
    return { unsubscribe }
  }

  public dispatch(event: Event): void {
    const subscribers: EventSubscriber[] = []
    const eventSubscribers = this.eventSubscribers[event.type]
    if (eventSubscribers) {
      eventSubscribers.forEach(s => subscribers.push(s))
    }
    if (event.id) {
      const eventTypeSubscribers = this.eventIdSubscribers[event.type]
      if (eventTypeSubscribers) {
        const eventIdSubscribers = eventTypeSubscribers[event.id]
        if (eventIdSubscribers) {
          eventIdSubscribers.forEach(s => subscribers.push(s))
        }
      }
    }

    subscribers
      .sort((a, b) => (a.config.priority ?? 0) - (b.config.priority ?? 0))
      .forEach(s => {
        s.callback(event)
      })
  }

  public static getInstance(): EventBus {
    if (this.instance === undefined) {
      this.instance = new EventBus()
    }
    return this.instance
  }
}

export const BrickdocEventBus = EventBus.getInstance()
