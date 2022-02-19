declare global {
  interface BrickdocServerContext {
    internalApiEndpoint: string
    currentUser?: {
      domain: string
    }
    currentSpace: {
      domain: string
    }
    lastBlockIds?: {
      [domain: string]: string
    }
    lastDomain?: string
    env: string
    version: string
    locale: string
    rtl: boolean
    settings: { [key: string]: any }
    timezone: string
    defaultTimezone: string
    host: string
    selfHost: boolean
    csrfToken: string
    isDesktopApp: boolean
    featureFlags: string[]
    serverMessage: string
    sentryDsn: string
  }
  interface BrickdocClientContext {
    wsCable: ActionCable.Consumer
    uuid: string
  }
  type BrickdocContext = BrickdocServerContext & BrickdocClientContext

  // eslint-disable-next-line no-inner-declarations, no-var
  var brickdocContext: BrickdocContext
}

export {}
