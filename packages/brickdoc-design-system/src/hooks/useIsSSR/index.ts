import { useState, useContext } from 'react'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../useIsomorphicLayoutEffect'
import { IDContext, defaultContext } from '../../components/Provider/IDProvider'

/**
 * Returns whether the component is currently being server side rendered or
 * hydrated on the client. Can be used to delay browser-specific rendering
 * until after hydration.
 *
 * Forked from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/ssr/src/SSRProvider.tsx
 * Copyright 2020 Adobe | Apache License
 */
export function useIsSSR(): boolean {
  const cur = useContext(IDContext)
  const isInSSRContext = cur !== defaultContext
  const [isSSR, setIsSSR] = useState(isInSSRContext)

  // If on the client, and the component was initially server rendered,
  // then schedule a layout effect to update the component after hydration.
  if (typeof window !== 'undefined' && isInSSRContext) {
    // This if statement technically breaks the rules of hooks, but is safe
    // because the condition never changes after mounting.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      setIsSSR(false)
    }, [])
  }

  return isSSR
}
