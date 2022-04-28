import { SettingsService } from '../settings'
export interface ServerPluginMeta {
  addonsId: string
  dir: string
}

export const SERVER_PLUGIN_HOOK_OPTIONS_METADATA = 'brickdoc-server-plugin:hook'

export enum HookType {
  CORE_ERROR_REPORTER = 'core.ERROR_REPORTER',
  CORE_INITIALIZER = 'core.INITIALIZER'
}

type AsyncProvider<T> = (setting: SettingsService) => Promise<T>

interface HookProviders {
  [HookType.CORE_ERROR_REPORTER]: {
    forHookAsync: AsyncProvider<{ report: (err: Error) => void }>
  }
  [HookType.CORE_INITIALIZER]: {
    forHookAsync: AsyncProvider<void>
  }
}

export type HookProvider<T extends HookType> = HookProviders[T]
