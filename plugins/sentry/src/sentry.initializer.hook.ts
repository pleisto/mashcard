import { SettingsService } from '@brickdoc/server-api/src/common/settings'
import { ServerPluginHook, HookType, HookProvider } from '@brickdoc/server-api/src/common/server-plugin'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import { withNamespace } from './sentry-plugin.utils'

@ServerPluginHook(HookType.CORE_INITIALIZER)
export class SentryInitializerHook implements HookProvider<HookType.CORE_INITIALIZER> {
  async forHookAsync(setting: SettingsService): Promise<void> {
    const dsn = await setting.get<string>(withNamespace('dsn'))
    const tracesSampleRate = await setting.get<number>(withNamespace('tracesSampleRate'))
    if (dsn.isErr()) throw dsn.error
    if (tracesSampleRate.isErr()) throw tracesSampleRate.error

    Sentry.init({
      dsn: dsn.value!,
      tracesSampleRate: tracesSampleRate.value!,
      integrations: [new Tracing.Integrations.Postgres({ usePgNative: false })]
    })
  }
}
