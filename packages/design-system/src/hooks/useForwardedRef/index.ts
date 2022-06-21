import { ForwardedRef, RefObject, useRef, useCallback } from 'react'

/**
 * This hook merges the forwarded ref with the ref provided by the component itself.
 *
 * @param ref The fowarded ref from outside the component.
 * @returns A ref object that is **not only** connected to the external ref
 * **but also** allowing the component itself to read from.
 */
export function useForwardedRef<T>(ref: ForwardedRef<T>): [RefObject<T>, (instance: T) => void] {
  const innerRef = useRef<T | null>(null)
  const updateCallback = useCallback(
    (node: any) => {
      innerRef.current = node
      if (ref) {
        if (typeof ref === 'function') {
          ref(node)
        } else {
          ref.current = node
        }
      }
    },
    [ref]
  )
  return [innerRef, updateCallback]
}
