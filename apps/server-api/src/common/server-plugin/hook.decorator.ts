import { SetMetadata } from '@nestjs/common'
import { HookType, SERVER_PLUGIN_HOOK_OPTIONS_METADATA } from './server-plugin.interface'

/**
 * Decorator for registering server plugin hooks.
 * @param hookType Hook type.
 *
 * @example
 * ```ts
 * @Hook(HookType.CORE_INITIALIZER)
 * export class MyPlugin {
 *  async forHookAsync(setting: SettingsService) {}
 * }
 * ```
 */
export function ServerPluginHook(type: HookType): ClassDecorator {
  return SetMetadata(SERVER_PLUGIN_HOOK_OPTIONS_METADATA, type)
}
