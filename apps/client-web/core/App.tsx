import { Suspense, FC, useContext } from 'react'
import { BrickdocContext } from '@/common/brickdocContext'
import { useErrorNotification } from '@/common/hooks'
import { ApolloProvider, useReactiveVar } from '@apollo/client'
import { Loading, globalStyle, Provider } from '@brickdoc/design-system'
import { HelmetProvider } from 'react-helmet-async'
import { apolloClient } from './apollo'
import { RootRoutes } from './RootRoutes'
import { withProfiler } from '@sentry/react'
import { isLoadingVar } from '@/common/reactiveVars'

export const App: FC = () => {
  // Inject global styles
  globalStyle()

  const context = useContext(BrickdocContext)
  const isLoading = useReactiveVar(isLoadingVar)

  useErrorNotification(context.serverMessage)

  return (
    <Suspense fallback={<Loading />}>
      <BrickdocContext.Provider value={context}>
        <Provider>
          <ApolloProvider client={apolloClient}>
            <HelmetProvider>
              {isLoading && <Loading />}
              <RootRoutes />
            </HelmetProvider>
          </ApolloProvider>
        </Provider>
      </BrickdocContext.Provider>
    </Suspense>
  )
}

export const BrickdocPWA = withProfiler(App, {
  name: 'BrickdocPWA'
})
