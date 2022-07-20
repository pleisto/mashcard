declare global {
  interface MashcardServerContext {
    internalApiEndpoint: {
      graphql: string
      actionCable: string
    }
    currentUser?: {
      domain: string
      name: string
      avatarData?: { url: string; downloadUrl: string; signedId: string }
    }
    lastBlockIds?: {
      [domain: string]: string
    }
    lastDomain?: string
    env: string
    version: string
    monorepoVersion: string
    locale: string
    rtl: boolean
    settings: { [key: string]: any }
    features: { [key: string]: any }
    timezone: string
    defaultTimezone: string
    selfHost: boolean
    csrfToken: string
    isDesktopApp: boolean
    featureFlags: string[]
    serverMessage: string
    sentryDsn: string
  }
  interface MashcardClientContext {
    wsCable: ActionCable.Consumer
    uuid: string
  }
  type MashcardContext = MashcardServerContext & MashcardClientContext

  // eslint-disable-next-line no-inner-declarations, no-var
  var mashcardContext: MashcardContext
}

export {}
