/**
 * Forked from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/ssr/src/SSRProvider.tsx
 * Copyright 2020 Adobe | Apache License
 */
import { FC, createContext, ReactNode, useMemo, useContext } from 'react'

// To support SSR, the auto incrementing id counter is stored in a context. This allows
// it to be reset on every request to ensure the client and server are consistent.
// There is also a prefix string that is used to support async loading components
// Each async boundary must be wrapped in an ID provider, which appends to the prefix
// and resets the current id counter. This ensures that async loaded components have
// consistent ids regardless of the loading order.
interface IDContextValue {
  prefix: string
  current: number
}

// Default context value to use in case there is no IDProvider. This is fine for
// client-only apps. In order to support multiple copies of React Aria potentially
// being on the page at once, the prefix is set to a random number. IDProvider
// will reset this to zero for consistency between server and client, so in the
// SSR case multiple copies of @brickdoc/design-system is not supported.
export const defaultContext: IDContextValue = {
  prefix: String(Math.round(Math.random() * 10000000000)),
  current: 0
}

export const IDContext = createContext<IDContextValue>(defaultContext)

interface IDProviderProps {
  /** Your application here. */
  children: ReactNode
}

/**
 * When using SSR with brickdoc design system, applications must be wrapped in an IDProvider.
 * This ensures that auto generated ids are consistent between the client and server.
 */
export const IDProvider: FC<IDProviderProps> = props => {
  const cur = useContext(IDContext)
  const value: IDContextValue = useMemo(
    () => ({
      // If this is the first IDProvider, start with an empty string prefix, otherwise
      // append and increment the counter.
      prefix: cur === defaultContext ? '' : `${cur.prefix}-${++cur.current}`,
      current: 0
    }),
    [cur]
  )

  return <IDContext.Provider value={value}>{props.children}</IDContext.Provider>
}
