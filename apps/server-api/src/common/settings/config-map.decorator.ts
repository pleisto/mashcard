import { SetMetadata } from '@nestjs/common'
import { CONFIG_MAP_NAMESPACE_METADATA } from './settings.interface'

/**
 * Decorator for declaring config map class.
 * ConfigMap is inspired by Kubernetes ConfigMap, it is a way to distribute stored configurations schemas.
 * @param namespace Config map namespace (e.g. 'plugins.plugin-name')
 */
export function ConfigMap(namespace: string): ClassDecorator {
  return SetMetadata(CONFIG_MAP_NAMESPACE_METADATA, namespace)
}
