import { join } from 'path'
import { promises, access, constants, createReadStream, ReadStream, accessSync } from 'fs'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { LocalBaseStorageAdaptor } from '../local-base.storage-adaptor'
import { BlobPutOptions, BlobMetadata, STORAGE_BUCKETS } from '../../blobs.interface'
import { SettingsService } from '../../../settings'
import { KMSService } from '../../../kms'

@Injectable()
export class DiskStorageAdaptor extends LocalBaseStorageAdaptor implements OnModuleInit {
  constructor(protected readonly settings: SettingsService, protected readonly kms: KMSService) {
    super(settings, kms)
  }

  /**
   * Check bucket folders exists and could be written
   * It's will create folders if not exists
   */
  async onModuleInit(): Promise<void> {
    Object.values(STORAGE_BUCKETS).forEach(async bucket => {
      const path = await this.getUploadDir(bucket)
      access(path, constants.W_OK, async (e: any) => {
        if (e == null) return
        if (e?.code === 'ENOENT') {
          await promises.mkdir(path, { recursive: true })
        } else {
          throw e
        }
      })
    })
  }

  async head(bucket: STORAGE_BUCKETS, key: string): Promise<BlobMetadata | undefined> {
    try {
      const stats = await promises.stat(join(await this.getUploadDir(bucket), key))
      return {
        size: stats.size,
        updatedAt: stats.mtime
      }
    } catch (e: any) {
      if (e?.code === 'ENOENT') {
        return undefined
      } else {
        throw e
      }
    }
  }

  async get(bucket: STORAGE_BUCKETS, key: string): Promise<ReadStream | undefined> {
    const path = join(await this.getUploadDir(bucket), key)
    try {
      accessSync(path, constants.R_OK)
      return createReadStream(path)
    } catch (e: any) {
      if (e?.code === 'ENOENT') {
        return undefined
      } else {
        throw e
      }
    }
  }

  async put(bucket: STORAGE_BUCKETS, key: string, data: Buffer, options?: BlobPutOptions): Promise<void> {
    const opts = options?.overwrite ? { flag: 'w' } : {}
    await promises.writeFile(join(await this.getUploadDir(bucket), key), data, opts)
  }

  /**
   * get upload dir form bucket
   * @param bucket - Bucket name
   * @returns
   */
  private async getUploadDir(bucket: STORAGE_BUCKETS): Promise<string> {
    const dirRoot = (await this.settings.get<string>('core.blobs.disk.uploadDir'))._unsafeUnwrap()!
    return join(dirRoot, bucket)
  }
}
