import { env } from 'process'
import { ConfigMap, Item, ScopeLookupStrategy } from '@brickdoc/server-api/src/common/settings'

@ConfigMap('core.blobs')
export class BlobsConfigMap {
  /**
   * Blob storage adaptor
   */
  @Item({
    scope: ScopeLookupStrategy.LOCAL_STATIC
  })
  adaptor: string = env.BLOB_ADAPTOR ?? 'DiskBlobsAdaptor'
}
