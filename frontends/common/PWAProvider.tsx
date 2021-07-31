import React, { Suspense } from 'react'
import i18n from 'i18next'
import { ApolloProvider } from '@apollo/client'
import { Spin, ConfigProvider } from '@brickdoc/design-system'
import { HelmetProvider } from 'react-helmet-async'
import { apolloClient } from '@/common/apollo'
import { InMemoryCacheConfig } from '@apollo/client/cache/inmemory/inMemoryCache'

export const BrickdocContext: React.Context<BrickdocContext> = React.createContext(globalThis.brickdocContext)
BrickdocContext.displayName = 'BrickdocGlobalConfig'

const direction = globalThis.brickdocContext.rtl ? 'rtl' : 'ltr'

interface ProviderInterface {
  cacheConfig?: InMemoryCacheConfig
}

export const PWAProvider: React.FC<ProviderInterface> = props => {
  return (
    <Suspense fallback={<Spin delay={1000} />}>
      <ConfigProvider direction={direction} i18n={i18n}>
        <ApolloProvider client={apolloClient(props.cacheConfig)}>
          <HelmetProvider>{props.children}</HelmetProvider>
        </ApolloProvider>
      </ConfigProvider>
    </Suspense>
  )
}
