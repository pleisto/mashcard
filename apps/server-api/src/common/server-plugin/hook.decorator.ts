import { SetMetadata } from '@nestjs/common'
import { HookType, SERVER_PLUGIN_HOOK_OPTIONS_METADATA } from './server-plugin.interface'

export function ServerPluginHook(type: HookType): ClassDecorator {
  return SetMetadata(SERVER_PLUGIN_HOOK_OPTIONS_METADATA, type)
}
