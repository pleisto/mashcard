import { env } from 'process'
import { join } from 'path'
import { ConfigMap, Item, ScopeLookupStrategy } from '@brickdoc/server-api/src/common/settings'
import { SERVER_SRC_ROOT } from '../../../utils'

@ConfigMap('core.blobs.disk')
export class DiskConfigMap {
  /**
   * Upload path
   */
  @Item({
    scope: ScopeLookupStrategy.LOCAL_STATIC
  })
  uploadDir: string = env.DISK_UPLOAD_DIR ?? join(SERVER_SRC_ROOT, '../uploads')
}
