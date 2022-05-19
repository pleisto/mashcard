import { SettingsService } from '@brickdoc/server-api/src/common/settings'
import { ServerPluginHook, HookType, HookProvider } from '@brickdoc/server-api/src/common/server-plugin'
import { PluginOrDisabledPlugin } from '@envelop/core'
import { useSentry } from '@envelop/sentry'

@ServerPluginHook(HookType.GRAPHQL_ENVELOP_PLUGIN)
export class SentryGraphQLEnvelopHook implements HookProvider<HookType.GRAPHQL_ENVELOP_PLUGIN> {
  async forHookAsync(_setting: SettingsService): Promise<PluginOrDisabledPlugin> {
    return useSentry()
  }
}
