import { init as SentryInit, setUser, setContext } from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { Offline as OfflineIntegration } from '@sentry/integrations'
import { currentPodUsername } from '@/common/utils/currentPodUsername'

export const sentryInit = (): void => {
  const ctx = globalThis.mashcardContext
  SentryInit({
    dsn: ctx.sentryDsn,
    environment: ctx.env,
    // TODO: Integrate with react router v6
    integrations: [new Integrations.BrowserTracing(), new OfflineIntegration()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    maxValueLength: 2048,
    release: `mashcard@${ctx.monorepoVersion}`
  })
  const userDomain = ctx?.currentUser?.domain
  userDomain &&
    setUser({
      username: userDomain,
      // Sentry will infer the IP address from the
      // connection between your app and Sentry's server.
      ip_address: '{{auto}}'
    })
  const currentUsername = currentPodUsername(ctx)
  currentUsername &&
    setContext('pod', {
      currentPod: currentUsername,
      lastBlockIds: ctx?.lastBlockIds?.[currentUsername]
    })
}
