/* eslint-disable max-params */
import { Bucket, Storage } from '@google-cloud/storage'
import { ApiError } from '@google-cloud/storage/build/src/nodejs-common/util'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { type Logger } from 'winston'
import { Inject } from '@nestjs/common'
import { type GCSBucketOptions } from './gcloud-plugin.config-map'
import { ServerPluginHook, HookType, HookProvider } from '@brickdoc/server-api/src/common/server-plugin'
import { BaseStorageAdaptor } from '@brickdoc/server-api/src/common/blobs/storage-adaptor/base.storage-adaptor'
import { STORAGE_BUCKETS, BlobMetadata } from '@brickdoc/server-api/src/common/blobs/blobs.interface'
import { SettingsService } from '@brickdoc/server-api/src/common/settings'
import { withNamespace } from './gcloud-plugin.utils'

@ServerPluginHook(HookType.COMMON_BLOBS_STORAGE_ADAPTOR)
export class GCSStorageAdaptorHook
  extends BaseStorageAdaptor
  implements HookProvider<HookType.COMMON_BLOBS_STORAGE_ADAPTOR>
{
  /**
   * Get Google Cloud Storage client
   */
  client = new Storage()

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly settings: SettingsService
  ) {
    super()
  }

  /**
   * Get file metadata
   */
  public async head(bucket: STORAGE_BUCKETS, key: string): Promise<BlobMetadata | undefined> {
    try {
      const file = (await this.getBucket(bucket)).file(key)
      const [metadata] = await file.getMetadata()
      return {
        size: metadata.size,
        updatedAt: metadata.updated
      }
    } catch (e: any) {
      if (e instanceof ApiError && e.code === 404) return undefined
      this.logEvent('error', 'head', { bucket, key }, e)
      throw e
    }
  }

  /**
   * Get file readable stream from Google Cloud Storage
   */
  public async get(bucket: STORAGE_BUCKETS, key: string): Promise<NodeJS.ReadableStream | undefined> {
    try {
      const file = (await this.getBucket(bucket)).file(key)
      return file.createReadStream()
    } catch (e: any) {
      if (e instanceof ApiError && e.code === 404) return undefined
      this.logEvent('error', 'get', { bucket, key }, e)
      throw e
    }
  }

  /**
   * Upload file to Google Cloud Storage by stream
   */
  public async put(bucket: STORAGE_BUCKETS, key: string): Promise<NodeJS.WritableStream> {
    const file = (await this.getBucket(bucket)).file(key)
    return file.createWriteStream()
  }

  /**
   * Delete file
   */
  public async delete(bucket: STORAGE_BUCKETS, key: string): Promise<boolean> {
    const gcs = await this.getBucket(bucket)
    try {
      await gcs.file(key).delete()
      return true
    } catch (e: any) {
      const logLevel = e instanceof ApiError && e.code === 404 ? 'info' : 'error'
      this.logEvent(logLevel, 'delete', { bucket, key }, e)
      return false
    }
  }

  public async directDownloadUrl(bucket: STORAGE_BUCKETS, key: string, expires: number): Promise<string | undefined> {
    const signedUrl = await this.signedUrl('read', bucket, key, expires)
    if (bucket === STORAGE_BUCKETS.PUBLIC && signedUrl !== undefined) {
      // Public bucket doesn't need to be signed
      const url = new URL(signedUrl)
      url.search = ''
      return url.toString()
    } else {
      return signedUrl
    }
  }

  public async directUploadUrl(bucket: STORAGE_BUCKETS, key: string, expires: number): Promise<string | undefined> {
    return await this.signedUrl('write', bucket, key, expires)
  }

  /**
   * Signed URL for Google Cloud Storage
   */
  private async signedUrl(
    action: 'read' | 'write',
    bucket: STORAGE_BUCKETS,
    key: string,
    expires: number
  ): Promise<string | undefined> {
    try {
      const options = await this.getOptions(bucket)
      const gcs = await this.getBucket(bucket)
      const [url] = await gcs.file(key).getSignedUrl({
        version: 'v4',
        action,
        expires: Date.now() + expires * 1_000,
        cname: options.cname,
        virtualHostedStyle: options.virtualHostedStyle
      })
      return url
    } catch (e: any) {
      const logLevel = e instanceof ApiError && e.code === 404 ? 'warn' : 'error'
      this.logEvent(logLevel, 'signedUrl', { bucket, key, action, expires }, e)
      return undefined
    }
  }

  private async getOptions(bucket: STORAGE_BUCKETS): Promise<GCSBucketOptions> {
    const key = withNamespace(bucket === STORAGE_BUCKETS.PUBLIC ? 'gcsPublicBucket' : 'gcsPrivateBucket')
    const options = await this.settings.get<GCSBucketOptions>(key)

    return options._unsafeUnwrap()!
  }

  /**
   * Get Google Cloud Storage bucket object
   */
  private async getBucket(bucket: STORAGE_BUCKETS): Promise<Bucket> {
    const bucketName = (await this.getOptions(bucket)).name
    return this.client.bucket(bucketName)
  }

  private logEvent(level = 'info' || 'warn' || 'error', action: string, payload: any, exception?: Error): void {
    this.logger.log(level, {
      context: withNamespace(`GCSStorageAdaptorHook.${action}`),
      payload,
      exception
    })
  }
}
