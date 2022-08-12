import { useObservable } from '@ngneat/react-rxjs'
import { useDebugValue, useMemo, useRef } from 'react'
import { Observable } from 'rxjs'
import { TransientStore, useTransientStore } from '../transientStore'

export class BaseDataService {
  constructor(protected readonly transientStore: TransientStore) {}

  static toReactHook<T extends BaseDataService>(
    this: new (transientStore: TransientStore) => T
  ): () => {
    [K in keyof T]: T[K] extends Observable<infer V> ? V : T[K]
  } {
    const useDataService = (): any => {
      const transientStore = useTransientStore()
      const serviceRef = useRef<T>()

      if (!serviceRef.current) serviceRef.current = new this(transientStore)
      const keys = useMemo(() => {
        const propertyKeySet = new Set<string>()
        let current = serviceRef.current
        while (current !== BaseDataService.prototype) {
          Object.getOwnPropertyNames(current).forEach(value => propertyKeySet.add(value))
          current = Object.getPrototypeOf(current)
        }
        return Array.from(propertyKeySet).filter(key => key !== 'constructor' && key !== 'transientStore')
      }, [])

      const resolvedService: Record<string, unknown> = {}
      for (const key of keys) {
        const value = serviceRef.current[key as keyof T]
        if (value instanceof Observable) {
          ;[resolvedService[key]] = useObservable(value)
        } else if (value instanceof Function) {
          resolvedService[key] = useMemo(() => value.bind(serviceRef.current), [])
        } else {
          resolvedService[key] = value
        }
      }
      useDebugValue(this.name)
      useDebugValue(resolvedService)
      return resolvedService
    }
    return useDataService
  }
}
