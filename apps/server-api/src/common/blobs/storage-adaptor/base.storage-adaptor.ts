import { BlobMetadata, STORAGE_BUCKETS } from '../blobs.interface'

/**
 * Abstract class for blob storage class adaptors.
 * If you need to implement a new adaptor for an internet-accessible cloud storage service,
 * you can extend this class. Otherwise, please refer `LocalBaseStorageAdaptor` class.
 */
export abstract class BaseStorageAdaptor {
  /**
   * Check if blob exists and return blob metadata
   * @param bucket Storage bucket
   * @param key blob key
   */
  public abstract head(bucket: STORAGE_BUCKETS, key: string): Promise<BlobMetadata | undefined>

  /**
   * Download blob to buffer
   * @param bucket Storage bucket
   * @param key blob key
   */
  public abstract get(bucket: STORAGE_BUCKETS, key: string): Promise<NodeJS.ReadableStream | undefined>

  /**
   * Upload blob from write stream
   * @param bucket Storage bucket
   * @param key blob key
   */
  public abstract put(bucket: STORAGE_BUCKETS, key: string): Promise<NodeJS.WritableStream>

  /**
   * Delete blob
   * @param bucket Storage bucket
   * @param key blob key
   */
  public abstract delete(bucket: STORAGE_BUCKETS, key: string): Promise<boolean>

  /**
   * Get a download url for a blob
   * @param bucket Storage bucket
   * @param key blob key
   * @param expires expiration time in seconds
   */
  public abstract directDownloadUrl(bucket: STORAGE_BUCKETS, key: string, expires: number): Promise<undefined | string>

  /**
   * Get a direct upload url for a blob
   * @param bucket Storage bucket
   * @param key blob key
   * @param expires expiration time in seconds
   */
  public abstract directUploadUrl(bucket: STORAGE_BUCKETS, key: string, expires: number): Promise<undefined | string>
}
