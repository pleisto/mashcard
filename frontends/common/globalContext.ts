import React from 'react'

export interface globalContext {
  internalApiEndpoint: string
  env: string
  version: string
  locale: string
  rtl: boolean
  currentPod?: {
    webid: string
  }
  currentUser?: {
    webid: string
  }
  timezone: string
  selfHost: boolean
  csrfToken: string
  isDesktopApp: boolean
  featureFlags: string[]
  serverMessage: string
}

export const BrickdocContext: React.Context<globalContext> = React.createContext(globalThis.brickdocContext)
BrickdocContext.displayName = 'BrickdocGlobalConfig'
