import { Suspense, FC, createContext, useContext, useEffect } from 'react'
import { ApolloProvider } from '@apollo/client'
import { Spin, notification } from '@brickdoc/design-system'
import { HelmetProvider } from 'react-helmet-async'
import { apolloClient } from '@/common/apollo'
import { BrowserRouter as Router } from 'react-router-dom'
import { routeConfig } from './config/routes'

export const BrickdocContext: React.Context<BrickdocContext> = createContext(globalThis.brickdocContext)
BrickdocContext.displayName = 'BrickdocGlobalConfig'

export const BrickdocPWA: FC = () => {
  const context = useContext(BrickdocContext)
  useEffect(() => {
    if (context.serverMessage) notification.error({ message: 'Error', description: context.serverMessage })
  })
  return (
    <Suspense fallback={<Spin delay={1000} />}>
      <ApolloProvider client={apolloClient()}>
        <HelmetProvider>
          <Router>{routeConfig(context)}</Router>
        </HelmetProvider>
      </ApolloProvider>
    </Suspense>
  )
}
