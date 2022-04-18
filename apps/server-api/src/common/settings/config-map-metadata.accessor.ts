import { Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper'
import { CONFIG_MAP_NAMESPACE_METADATA, ITEM_OPTIONS_METADATA, ItemOptions } from './settings.interface'

@Injectable()
/**
 * Get reflector metadata from ConfigMap providers
 * @see [Reflection](https://docs.nestjs.com/guards#putting-it-all-together)
 */
export class ConfigMapMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  /**
   *  Get the namespace of the ConfigMap
   */
  getConfigMapNamespace(wrapper: InstanceWrapper): string | undefined {
    /**
     * reference from:
     * {@link https://github.com/nestjs/bull/blob/master/packages/bullmq/lib/bull.explorer.ts}
     *
     * NOTE: Regarding the ternary statement below,
     * - The condition `!wrapper.metatype` is because when we use `useValue`
     * the value of `wrapper.metatype` will be `null`.
     * - The condition `wrapper.inject` is needed here because when we use
     * `useFactory`, the value of `wrapper.metatype` will be the supplied
     * factory function.
     * For both cases, we should use `wrapper.instance.constructor` instead
     * of `wrapper.metatype` to resolve processor's class properly.
     * But since calling `wrapper.instance` could degrade overall performance
     * we must defer it as much we can. But there's no other way to grab the
     * right class that could be annotated with `@ConfigMap()` decorator
     * without using this property.
     **/
    const target = !wrapper.metatype || wrapper.inject ? wrapper.instance?.constructor : wrapper.metatype
    if (!target) return undefined
    return this.reflector.get(CONFIG_MAP_NAMESPACE_METADATA, target)
  }

  /**
   * Get the options of the ConfigMap item
   */
  getItemOptions(wrapper: InstanceWrapper, propertyKey: string): ItemOptions | undefined {
    /**
     * @nestjs/core#Reflector doesn't support PropertyDecorator.
     * so we use vanilla code here.
     */
    return Reflect.getMetadata(ITEM_OPTIONS_METADATA, wrapper.instance, propertyKey)
  }
}
