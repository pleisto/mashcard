import { useErrorNotification } from '@/common/hooks'
import { MashcardContext } from '@/common/mashcardContext'
import { isLoadingVar } from '@/common/reactiveVars'
import { initSidebarStyle } from '@/routes/$domain/settings/_shared/Sidebar.style'
import { ApolloProvider, useReactiveVar } from '@apollo/client'
import { globalStyle, Loading, Provider } from '@mashcard/design-system'
import { ErrorBoundary, withProfiler } from '@sentry/react'
import { FC, Suspense, useContext } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { apolloClient } from './apollo'
import { RootRoutes } from './RootRoutes'

export const App: FC = () => {
  // Inject global styles
  globalStyle()

  // TODO: this should be called at page level instead of app level
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
