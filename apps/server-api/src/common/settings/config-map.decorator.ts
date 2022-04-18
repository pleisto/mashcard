import { SetMetadata } from '@nestjs/common'
import { CONFIG_MAP_NAMESPACE_METADATA } from './settings.interface'

export function ConfigMap(namespace: string): ClassDecorator {
  return SetMetadata(CONFIG_MAP_NAMESPACE_METADATA, namespace)
}
