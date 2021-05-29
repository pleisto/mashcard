import React, { Suspense } from 'react'
import { ApolloProvider } from '@apollo/client'
import { ConfigProvider } from '@brickdoc/design-system'

export default (props)=>{
  return <React.StrictMode>
    <ConfigProvider>
      <Suspense fallback={<div>todo</div>}>
        <ApolloProvider client={globalThis.brickdocContext.gqlClient}>
          {props.children}
        </ApolloProvider>
      </Suspense>
    </ConfigProvider>
  </React.StrictMode>
}
