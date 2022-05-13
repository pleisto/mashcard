import { Injectable, Inject } from '@nestjs/common'
import { BLOB_STORAGE } from './blobs.interface'
import { BaseStorageAdaptor } from './storage-adaptor/base.storage-adaptor'
import { LocalBaseStorageAdaptor } from './storage-adaptor/local-base.storage-adaptor'

@Injectable()
export class BlobsService {
  constructor(@Inject(BLOB_STORAGE) private readonly storage: BaseStorageAdaptor | LocalBaseStorageAdaptor) {}

  /**
   * Check storage adaptor required local HTTP endpoint or not
   */
  public enabledStorageOverLocalHttpService(): boolean {
    return (this.storage as LocalBaseStorageAdaptor)?.storageOverLocalHttpService
  }
}
