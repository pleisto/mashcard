import { Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper'
import { HookType, SERVER_PLUGIN_HOOK_OPTIONS_METADATA } from './server-plugin.interface'

@Injectable()
/**
 * Get reflector metadata from ServerPluginHook decorator
 * @see [Reflection](https://docs.nestjs.com/guards#putting-it-all-together)
 */
export class HookMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  /**
   * Get the hook metadata
   */
  getHook(wrapper: InstanceWrapper): HookType | undefined {
    const target = !wrapper.metatype || wrapper.inject ? wrapper.instance?.constructor : wrapper.metatype
    if (!target) return undefined
    return this.reflector.get(SERVER_PLUGIN_HOOK_OPTIONS_METADATA, target)
  }
}
