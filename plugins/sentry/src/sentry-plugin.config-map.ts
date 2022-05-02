import { env } from 'process'
import { ConfigMap, Item, ScopeLookupStrategy } from '@brickdoc/server-api/src/common/settings'
import { string, number } from 'yup'

@ConfigMap('plugin.brickdoc.sentry')
export class SentryConfigMap {
  /**
   * Sentry DSN
   * @returns default value
   */
  @Item({
    scope: ScopeLookupStrategy.LOCAL_STATIC,
    validation: string().required()
  })
  dsn: string = env.SENTRY_DSN!

  @Item({
    scope: ScopeLookupStrategy.LOCAL_STATIC,
    validation: number()
  })
  tracesSampleRate: number = Number(env.SERVER_TRACES_SAMPLE_RATE ?? 1.0)
}
