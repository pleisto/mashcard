import React, { Suspense } from 'react'
import { ApolloProvider } from '@apollo/client'
import { Spin, ConfigProvider } from '@brickdoc/design-system'
import { HelmetProvider } from 'react-helmet-async'
import { apolloClient } from '@/common/apollo'
import { InMemoryCacheConfig } from '@apollo/client/cache/inmemory/inMemoryCache'

interface globalContext {
  internalApiEndpoint: string
  env: string
  version: string
  locale: string
  rtl: boolean
  currentUser?: {
    webid: string
    avatar: string
    name: string
  }
  timezone: string
  selfHost: boolean
  csrfToken: string
  isDesktopApp: boolean
  featureFlags: string[]
  serverMessage: string
}

export const BrickdocContext: React.Context<globalContext> = React.createContext(globalThis.brickdocContext)
BrickdocContext.displayName = 'BrickdocGlobalConfig'

const direction = globalThis.brickdocContext.rtl ? 'rtl' : 'ltr'

interface ProviderInterface {
  cacheConfig?: InMemoryCacheConfig
}

const PWAProvider: React.FC<ProviderInterface> = props => {
  return (
    <React.StrictMode>
      <Suspense fallback={<Spin delay={1000} />}>
        <ConfigProvider direction={direction} i18n={globalThis.i18n}>
          <ApolloProvider client={apolloClient(props.cacheConfig)}>
            <HelmetProvider>{props.children}</HelmetProvider>
          </ApolloProvider>
        </ConfigProvider>
      </Suspense>
    </React.StrictMode>
  )
}
export default PWAProvider
