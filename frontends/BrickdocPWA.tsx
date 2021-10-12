import React, { Suspense, FC, createContext, useContext, useEffect } from 'react'
import i18n from 'i18next'
import { ApolloProvider } from '@apollo/client'
import { Spin, notification, ConfigProvider } from '@brickdoc/design-system'
import { HelmetProvider } from 'react-helmet-async'
import { apolloClient } from '@/common/apollo'
import { BrowserRouter as Router } from 'react-router-dom'
import { routeConfig } from './config/routes'

export const BrickdocContext: React.Context<BrickdocContext> = createContext(globalThis.brickdocContext)
BrickdocContext.displayName = 'BrickdocGlobalConfig'

const direction = globalThis.brickdocContext.rtl ? 'rtl' : 'ltr'

export const BrickdocPWA: FC = () => {
  const context = useContext(BrickdocContext)
  useEffect(() => {
    if (context.serverMessage) notification.error({ message: 'Error', description: context.serverMessage })
  })
  return (
    <Suspense fallback={<Spin delay={1000} />}>
      <ConfigProvider direction={direction} i18n={i18n}>
        <ApolloProvider client={apolloClient()}>
          <HelmetProvider>
            <Router>{routeConfig(context)}</Router>
          </HelmetProvider>
        </ApolloProvider>
      </ConfigProvider>
    </Suspense>
  )
}
