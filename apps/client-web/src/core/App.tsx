import { useErrorNotification } from '@/common/hooks'
import { MashcardContext } from '@/common/mashcardContext'
import { ApolloProvider } from '@apollo/client'
import { globalStyle, Loading, Provider as DesignSystemProvider } from '@mashcard/design-system'
import { ErrorBoundary, withProfiler } from '@sentry/react'
import { FC, Suspense, useContext } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { apolloClient } from './apollo'
import { RootRoutes } from './RootRoutes'

export const App: FC = () => {
  // Inject global styles
  globalStyle()

  const context = useContext(MashcardContext)

  useErrorNotification(context.serverMessage)

  return (
    <ErrorBoundary showDialog dialogOptions={{ user: { name: context.currentUser?.domain } }}>
      <Suspense fallback={<Loading />}>
        <MashcardContext.Provider value={context}>
          <DesignSystemProvider>
            <ApolloProvider client={apolloClient}>
              <HelmetProvider>
                <RootRoutes />
              </HelmetProvider>
            </ApolloProvider>
          </DesignSystemProvider>
        </MashcardContext.Provider>
      </Suspense>
    </ErrorBoundary>
  )
}

export const MashcardPWA = withProfiler(App, {
  name: 'MashcardPWA'
})
