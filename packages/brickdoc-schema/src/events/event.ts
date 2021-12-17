import { EventType, Event, EventConstructor } from './types'

export function event<EventPayload = void>() {
  return <T extends string>(type: T, customConstructor?: EventConstructor<EventPayload>): EventType => {
    function eventConstructor(payload: EventPayload): Event {
      if (customConstructor) {
        return { type, payload, ...customConstructor(payload) }
      } else {
        return { type, payload }
      }
    }
    eventConstructor.eventType = type
    eventConstructor.toString = () => type
    return eventConstructor
  }
}
