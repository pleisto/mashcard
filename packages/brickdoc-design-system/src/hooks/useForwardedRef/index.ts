import { ForwardedRef, RefObject, useEffect, useRef } from 'react'

/**
 * This hook merges the forwarded ref with the ref provided by the component itself.
 *
 * @param ref The fowarded ref from outside the component.
 * @returns A ref object that is **not only** connected to the external ref
 * **but also** allowing the component itself to read from.
 */
export function useForwardedRef<T>(ref: ForwardedRef<T>): RefObject<T> {
  const innerRef = useRef<T>(null)
  useEffect(() => {
    if (!ref) return
    if (typeof ref === 'function') {
      ref(innerRef.current)
    } else {
      ref.current = innerRef.current
    }
  })
  return innerRef
}
