import React from "react"

interface globalContext {
  internalApiEndpoint: string
  env: string
  version: string
  locale: string
  rtl: boolean
  currentUser?: {
    webid: string
    avatar: string
    name: string
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
