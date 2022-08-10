import { useDebugValue, useState } from 'react'
import { useIsomorphicLayoutEffect } from 'ahooks'
import { BehaviorSubject, Observable } from 'rxjs'

export function useObservableValue<T>(observable: BehaviorSubject<T>): T
export function useObservableValue<T>(observable: Observable<T>): T | undefined
export function useObservableValue<T>(observable: Observable<T>, initialValue: T): T
export function useObservableValue<T>(observable: Observable<T>, initialValue?: T): T | undefined {
  const [state, setState] = useState(observable instanceof BehaviorSubject ? (observable.value as T) : initialValue)
  useIsomorphicLayoutEffect(() => {
    const subscription = observable.subscribe(newValue => {
      setState(newValue)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [observable])
  useDebugValue(state)
  return state
}
