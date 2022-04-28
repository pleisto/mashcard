import { SettingsService } from '../settings'
import { SeedDecoder } from '../kms/decoder/base.decoder'
export interface ServerPluginMeta {
  addonsId: string
  dir: string
}

export const SERVER_PLUGIN_HOOK_OPTIONS_METADATA = 'brickdoc-server-plugin:hook'

export enum HookType {
  /**
   * Exception Reporter Hook.
   */
  CORE_ERROR_REPORTER = 'core.error.REPORTER',

  /**
   * Hook for server initialization.
   */
  CORE_INITIALIZER = 'core.INITIALIZER',

  /**
   * KMS Seed Decoder Hook.
   */
  COMMON_KMS_DECODER = 'common.kms.DECODER'
}

type AsyncProvider<T> = (setting: SettingsService) => Promise<T>

interface HookProviders {
  [HookType.CORE_ERROR_REPORTER]: {
    forHookAsync: AsyncProvider<{ report: (err: Error) => void }>
  }
  [HookType.CORE_INITIALIZER]: {
    forHookAsync: AsyncProvider<void>
  }
  [HookType.COMMON_KMS_DECODER]: SeedDecoder
}

export type HookProvider<T extends HookType> = HookProviders[T]
