export interface Event {
  type: string
  payload: any
  id?: string
}

export interface EventType {
  eventType: string
  (args: any): Event
}

export type EventCallback = (event: Event) => void

export type EventConstructor<T> = (payload: T) => { [key: string]: any }

export interface EventSubscribeConfig {
  eventId?: string
  scope?: string
  priority?: number
  subscribeId?: string
}

export interface EventSubscriber {
  callback: EventCallback
  config: EventSubscribeConfig
}

export interface EventSubscribers {
  [key: string]: EventSubscriber[]
}

export interface EventIdSubscribers {
  [key: string]: EventSubscribers
}

export interface EventSubscribed {
  unsubscribe: () => void
}
