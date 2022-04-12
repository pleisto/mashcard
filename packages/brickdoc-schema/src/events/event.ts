import { EventType, Event, EventConstructor, EventConfigure } from './types'

export function event<EventPayload = void>(configure?: EventConfigure) {
  return <T extends string>(type: T, customConstructor?: EventConstructor<EventPayload>): EventType<EventPayload> => {
    function eventConstructor(payload: EventPayload): Event<EventPayload> {
      return {
        type,
        payload,
        configure: configure ?? {},
        ...customConstructor?.(payload)
      }
    }

    eventConstructor.eventType = type
    eventConstructor.toString = () => type

    return eventConstructor
  }
}
