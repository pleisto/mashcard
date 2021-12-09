import { Suspense, FC, useContext } from 'react'
import { BrickdocContext } from '@/common/brickdocContext'
import { useErrorNotification } from '@/common/hooks'
import i18n from 'i18next'
import { ApolloProvider } from '@apollo/client'
import { ConfigProvider } from '@brickdoc/design-system'
import { Loading } from '@brickdoc/brickdoc-headless-design-system'
import { HelmetProvider } from 'react-helmet-async'
import { apolloClient } from './apollo'
import { RootRoutes } from './RootRoutes'

export const BrickdocPWA: FC = () => {
  const context = useContext(BrickdocContext)
  const direction = context.rtl ? 'rtl' : 'ltr'

  useErrorNotification(context.serverMessage)

  return (
    <Suspense fallback={<Loading />}>
      <BrickdocContext.Provider value={context}>
        <ConfigProvider direction={direction} i18n={i18n}>
          <ApolloProvider client={apolloClient}>
            <HelmetProvider>
              <RootRoutes />
            </HelmetProvider>
          </ApolloProvider>
        </ConfigProvider>
      </BrickdocContext.Provider>
    </Suspense>
  )
}
