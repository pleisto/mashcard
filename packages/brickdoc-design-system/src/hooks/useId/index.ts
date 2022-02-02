import { useState, useEffect, useRef, useContext, useMemo } from 'react'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../useIsomorphicLayoutEffect'
import { IDContext, defaultContext } from '../../components/Provider/IDProvider'
import { prefix } from '../../themes'

const idsUpdaterMap: Map<string, (v: string) => void> = new Map()

const canUseDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement)

/**
 * @internal
 * Forked from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/ssr/src/SSRProvider.tsx
 * Copyright 2020 Adobe | Apache License
 */
function useSSRSafeId(defaultId?: string): string {
  const ctx = useContext(IDContext)

  // If we are rendering in a non-DOM environment, and there's no SSRProvider,
  // provide a warning to hint to the developer to add one.
  if (ctx === defaultContext && !canUseDOM) {
    console.warn(
      'When server rendering, you must wrap your application in an <Provider> to ensure consistent ids are generated between the client and server.'
    )
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => defaultId ?? `${prefix}-instance${ctx.prefix}-${++ctx.current}`, [defaultId])
}

/**
 * useId
 *
 * Autogenerate IDs to facilitate WAI-ARIA and server rendering.
 * @param defaultId - Default component id.
 *
 * Forked from https://github.com/adobe/react-spectrum/blob/main/packages/@react-aria/utils/src/useId.ts
 * Copyright 2020 Adobe | Apache License
 */
export function useId(defaultId?: string): string {
  const isRendering = useRef(true)
  isRendering.current = true
  const [value, setValue] = useState(defaultId)
  const nextId = useRef<string | null>(null)

  const res = useSSRSafeId(value)

  // don't memo this, we want it new each render so that the Effects always run
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateValue = (val: string | null) => {
    if (!isRendering.current) {
      setValue(val as string | undefined)
    } else {
      nextId.current = val
    }
  }

  idsUpdaterMap.set(res, updateValue)

  useLayoutEffect(() => {
    isRendering.current = false
  }, [updateValue])

  useLayoutEffect(() => {
    const r = res
    return () => {
      idsUpdaterMap.delete(r)
    }
  }, [res])

  useEffect(() => {
    const newId = nextId.current
    if (newId) {
      setValue(newId)
      nextId.current = null
    }
  }, [setValue, updateValue])
  return res
}

/**
 * Merges two ids.
 * Different ids will trigger a side-effect and re-render components hooked up with `useId`.
 */
export function mergeIds(idA: string, idB: string): string {
  if (idA === idB) {
    return idA
  }

  const setIdA = idsUpdaterMap.get(idA)
  if (setIdA) {
    setIdA(idB)
    return idB
  }

  const setIdB = idsUpdaterMap.get(idB)
  if (setIdB) {
    setIdB(idA)
    return idA
  }

  return idB
}
