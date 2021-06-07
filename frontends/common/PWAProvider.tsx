import React, { Suspense } from 'react'
import { ApolloProvider } from '@apollo/client'
import { Spin, ConfigProvider, Locale } from '@brickdoc/design-system'
import enUS from '@brickdoc/design-system/components/locale/en_US'
import zhCN from '@brickdoc/design-system/components/locale/zh_CN'

interface globalContext {
  internalApiEndpoint: string,
  env: string,
  version: string,
  locale: string,
  currentUser: null|{
    webid: string,
    avatar: string,
    name: string
  },
  timezone: string,
  selfHost: boolean,
  csrfToken: string,
  isDesktopApp: boolean,
  featureFlags: Array<string|null>
}


export const BrickdocContext: React.Context<globalContext> = React.createContext(globalThis.brickdocContext)
BrickdocContext.displayName = 'BrickdocGlobalConfig'

let locale: Locale
switch(globalThis.brickdocContext.locale){
  case 'zh-CN':
    locale = zhCN
    break
  case 'zh-HK':
    locale = zhCN
    break
  case 'zh-TW':
    locale = zhCN
    break
  case 'en-US':
    locale = enUS
    break
  default:
    locale = enUS
}

export default (props)=>{
  return <React.StrictMode>
    <ConfigProvider locale={locale}>
      <Suspense fallback={<Spin delay={1000}  />}>
        <ApolloProvider client={globalThis.brickdocContext.gqlClient}>
          {props.children}
        </ApolloProvider>
      </Suspense>
    </ConfigProvider>
  </React.StrictMode>
}
