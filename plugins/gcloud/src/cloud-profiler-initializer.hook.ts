import { SettingsService } from '@brickdoc/server-api/src/common/settings'
import { ServerPluginHook, HookType, HookProvider } from '@brickdoc/server-api/src/common/server-plugin'
import { start } from '@google-cloud/profiler'
import { withNamespace, serviceContext, projectId } from './gcloud-plugin.utils'

@ServerPluginHook(HookType.CORE_INITIALIZER)
export class CloudProfilerInitializerHook implements HookProvider<HookType.CORE_INITIALIZER> {
  async forHookAsync(setting: SettingsService): Promise<void> {
    const enabledCloudDebugger = (await setting.get<boolean>(withNamespace('enabledCloudProfiler'))).unwrapOr(false)
    if (enabledCloudDebugger)
      void start({
        projectId,
        serviceContext
      })
  }
}
