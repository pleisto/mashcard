import { EventType, Event, EventConstructor, EventConfigure } from './types'

export function event<EventPayload = void, CallbackResult = void>(configure?: EventConfigure) {
  return <T extends string>(
    type: T,
    customConstructor?: EventConstructor<EventPayload>
  ): EventType<EventPayload, CallbackResult> => {
    function eventConstructor(payload: EventPayload): Event<EventPayload, CallbackResult> {
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
