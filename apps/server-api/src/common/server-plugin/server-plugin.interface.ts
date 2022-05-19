import { SettingsService } from '../settings'
import { BaseSeedDecoder } from '../kms/seed-decoder/base.seed-decoder'
import { BaseStorageAdaptor } from '../blobs/storage-adaptor/base.storage-adaptor'
import { PluginOrDisabledPlugin } from '@envelop/core'

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
   * see /common/blobs/adaptors/adaptor.provider.ts
   */
  COMMON_BLOBS_STORAGE_ADAPTOR = 'common.BLOBS_ADAPTOR',

  /**
   * GraphQL Envelop Plugin Hook.
   * see /core/graphql/graphql.module.ts
   */
  GRAPHQL_ENVELOP_PLUGIN = 'common.GRAPHQL_ENVELOP_PLUGIN'
}

type AsyncProvider<T> = (setting: SettingsService) => Promise<T>

interface HookProviders {
  [HookType.CORE_INITIALIZER]: {
    forHookAsync: AsyncProvider<void>
  }
  [HookType.COMMON_KMS_SEED_DECODER]: BaseSeedDecoder
  [HookType.COMMON_BLOBS_STORAGE_ADAPTOR]: BaseStorageAdaptor
  [HookType.GRAPHQL_ENVELOP_PLUGIN]: {
    forHookAsync: AsyncProvider<PluginOrDisabledPlugin>
  }
}

export type HookProvider<T extends HookType> = HookProviders[T]
