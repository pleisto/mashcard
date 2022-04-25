import { env } from 'process'
import { ConfigMap, Item, ScopeLookupStrategy } from '@brickdoc/server-api/src/common/settings'

@ConfigMap('common.kms')
export class CoreConfigMap {
  /**
   * Google cloud project id
   * @returns default value
   */
  @Item({
    scope: ScopeLookupStrategy.LOCAL_STATIC
  })
  decoder: string = env.KMS_DECODER ?? 'plain'
}
