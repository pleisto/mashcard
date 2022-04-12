export interface Event<EventPayload = {}> {
  type: string
  payload: EventPayload
  configure: EventConfigure
  id?: string
}

export interface EventConfigure {
  persist?: boolean
}

export interface EventType<EventPayload = {}> {
  eventType: string
  (args: EventPayload): Event<EventPayload>
}

export type EventCallback<EventPayload> = (event: Event<EventPayload>) => void

export type EventConstructor<T> = (payload: T) => { [key: string]: any }

export interface EventSubscribeConfig {
  eventId?: string
  scope?: string
  priority?: number
  subscribeId?: string
}

export interface EventSubscriber {
  callback: EventCallback<any>
  config: EventSubscribeConfig
}

export interface EventSubscribers {
  [key: string]: EventSubscriber[] | undefined
}

export interface EventIdSubscribers {
  [key: string]: EventSubscribers | undefined
}

export interface EventsPool {
  [key: string]: Event[] | undefined
}

export interface EventSubscribed {
  unsubscribe: () => void
}
