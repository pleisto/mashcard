export const BLOB_STORAGE = Symbol('BLOB_STORAGE')

export interface BlobMetadata {
  size: number
  updatedAt: Date
}

export enum STORAGE_BUCKETS {
  PUBLIC = 'public_read',
  PRIVATE = 'private_attachment'
}

export interface StorageAdaptorModuleAsyncOptions {
  inject?: any[]
}
