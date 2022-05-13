import { SettingsService } from '@brickdoc/server-api/src/common/settings'
import { ServerPluginHook, HookType, HookProvider } from '@brickdoc/server-api/src/common/server-plugin'
import { withNamespace, serviceContext, projectId } from './gcloud-plugin.utils'

@ServerPluginHook(HookType.CORE_INITIALIZER)
export class CloudProfilerInitializerHook implements HookProvider<HookType.CORE_INITIALIZER> {
  async forHookAsync(setting: SettingsService): Promise<void> {
    const enabledCloudDebugger = (await setting.get<boolean>(withNamespace('enabledCloudProfiler'))).unwrapOr(false)
    if (enabledCloudDebugger)
      /**
       * Google Cloud Profiler will open handler when it is imported.
       * So we need lazy import it.
       */
      void (await import('@google-cloud/profiler')).start({
        projectId,
        serviceContext
      })
  }
}
