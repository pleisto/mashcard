import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common'
import { BLOB_STORAGE, STORAGE_BUCKETS } from './blobs.interface'
import { BaseStorageAdaptor } from './storage-adaptor/base.storage-adaptor'
import { LocalBaseStorageAdaptor } from './storage-adaptor/local-base.storage-adaptor'

const DEFAULT_EXPIRES_SECONDS = 60 * 60 // 1 hour

@Injectable()
export class BlobsService {
  constructor(@Inject(BLOB_STORAGE) private readonly storage: BaseStorageAdaptor | LocalBaseStorageAdaptor) {}

  /**
   * Check storage adaptor required local HTTP endpoint or not
   */
  public enabledStorageOverLocalHttpService(): boolean {
    return (this.storage as LocalBaseStorageAdaptor)?.storageOverLocalHttpService
  }

  /**
   * Get url of blob
   */
  private async getUrl(
    method: 'get' | 'put',
    bucket: STORAGE_BUCKETS,
    key: string,
    expires: number = DEFAULT_EXPIRES_SECONDS
  ): Promise<string> {
    const url =
      method === 'get'
        ? await this.storage.directDownloadUrl(bucket, key, expires)
        : await this.storage.directUploadUrl(bucket, key, expires)
    if (!url) {
      // The probability of triggering this error is extremely low, but it's better to handle it.
      throw new HttpException('Failed to get url for blob service', HttpStatus.SERVICE_UNAVAILABLE)
    }
    return url
  }
}
