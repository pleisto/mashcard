import { init as SentryInit, setUser, setContext } from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { Offline as OfflineIntegration } from '@sentry/integrations'

export const sentryInit = (): void => {
  const ctx = globalThis.brickdocContext
  SentryInit({
    dsn: ctx.sentryDsn,
    environment: ctx.env,
    integrations: [new Integrations.BrowserTracing(), new OfflineIntegration()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    maxValueLength: 2048,
    release: `brickdoc@${ctx.version}`
  })
  const userWebid = ctx?.currentUser?.webid
  userWebid &&
    setUser({
      username: userWebid,
      // Sentry will infer the IP address from the
      // connection between your app and Sentry's server.
      ip_address: '{{auto}}'
    })
  const currentPod = ctx?.currentPod?.webid
  currentPod &&
    setContext('pod', {
      currentPod,
      lastBlockIds: ctx?.lastBlockIds?.[currentPod]
    })
}
