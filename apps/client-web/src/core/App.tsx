import { Suspense, FC, useContext } from 'react'
import { MashcardContext } from '@/common/mashcardContext'
import { useErrorNotification } from '@/common/hooks'
import { ApolloProvider, useReactiveVar } from '@apollo/client'
import { Loading, globalStyle, Provider } from '@mashcard/design-system'
import { HelmetProvider } from 'react-helmet-async'
import { initSidebarStyle } from '@/settings/common/sidebar'
import { apolloClient } from './apollo'
import { RootRoutes } from './RootRoutes'
import { withProfiler, ErrorBoundary } from '@sentry/react'
import { isLoadingVar } from '@/common/reactiveVars'

export const App: FC = () => {
  // Inject global styles
  globalStyle()
  initSidebarStyle()

  const context = useContext(MashcardContext)
  const isLoading = useReactiveVar(isLoadingVar)

  useErrorNotification(context.serverMessage)

  return (
    <ErrorBoundary showDialog dialogOptions={{ user: { name: context.currentUser?.domain } }}>
      <Suspense fallback={<Loading />}>
        <MashcardContext.Provider value={context}>
          <Provider>
            <ApolloProvider client={apolloClient}>
              <HelmetProvider>
                {isLoading && <Loading />}
                <RootRoutes />
              </HelmetProvider>
            </ApolloProvider>
          </Provider>
        </MashcardContext.Provider>
      </Suspense>
    </ErrorBoundary>
  )
}

export const MashcardPWA = withProfiler(App, {
  name: 'MashcardPWA'
})
