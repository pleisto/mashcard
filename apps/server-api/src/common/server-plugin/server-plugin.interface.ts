import { SettingsService } from '../settings'
import { BaseSeedDecoder } from '../kms/seed-decoder/base.seed-decoder'
import { BaseStorageAdaptor } from '../blobs/storage-adaptor/base.storage-adaptor'
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
  COMMON_KMS_SEED_DECODER = 'common.kms.DECODER',

  /**
   * Blobs Adaptor Hook.
   * see /core/blobs/adaptors/adaptor.provider.ts
   */
  CORE_BLOBS_STORAGE_ADAPTOR = 'core.BLOBS_ADAPTOR'
}

type AsyncProvider<T> = (setting: SettingsService) => Promise<T>

interface HookProviders {
  [HookType.CORE_INITIALIZER]: {
    forHookAsync: AsyncProvider<void>
  }
  [HookType.COMMON_KMS_SEED_DECODER]: BaseSeedDecoder
  [HookType.CORE_BLOBS_STORAGE_ADAPTOR]: BaseStorageAdaptor
}

export type HookProvider<T extends HookType> = HookProviders[T]
