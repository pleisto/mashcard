import { SettingsService } from '../settings'
import { SeedDecoder } from '../kms/decoder/base.decoder'
export interface ServerPluginMeta {
  addonsId: string
  dir: string
}

export const SERVER_PLUGIN_HOOK_OPTIONS_METADATA = 'brickdoc-server-plugin:hook'

export enum HookType {
  /**
   * Hook for server initialization.
   * see /core/initializers/index.ts
   */
  CORE_INITIALIZER = 'core.INITIALIZER',

  /**
   * KMS Seed Decoder Hook.
   * see /common/kms/decoder/decoder.provider.ts
   */
  COMMON_KMS_DECODER = 'common.kms.DECODER'
}

type AsyncProvider<T> = (setting: SettingsService) => Promise<T>

interface HookProviders {
  [HookType.CORE_INITIALIZER]: {
    forHookAsync: AsyncProvider<void>
  }
  [HookType.COMMON_KMS_DECODER]: SeedDecoder
}

export type HookProvider<T extends HookType> = HookProviders[T]
