import { Module, Global } from '@nestjs/common'
import { BlobsService } from './blobs.service'
import { storageAdaptorProvider } from './storage-adaptor/storage-adaptor.provider'
import { DiskConfigMap } from './storage-adaptor/disk/disk.config-map'
import { BlobsConfigMap } from './blobs.config-map'
import { BlobsLocalEndpointController } from './blobs-local-endpoint.controller'
import { BlobsLocalEndpointFlagInterceptor } from './blobs-local-endpoint-flag.interceptor'

/**
 * Blobs module is a global module that provides blob storage services.
 * See `./blobs.service.ts` for more details.
 *
 * In default, it uses local disk storage as the default storage adaptor, you could set `env.DISK_UPLOAD_DIR` to
 * change the upload directory. And, you can also set `env.BLOBS_STORAGE_ADAPTOR` to change the storage adaptor.
 *
 * For example, you could use Google Cloud Storage by enabled GCloud Plugin:
 * ```
 * // dotenv file
 * ENABLED_SERVER_PLUGINS="brickdoc.gcloud,${other-plugins}"
 * BLOB_ADAPTOR="GCSStorageAdaptorHook"
 * GCP_PROJECT="foo"
 * GCP_GCS_PUBLIC_BUCKET="{"name":"$public","cname":"https://public.cdn.example.com"}"
 * GCP_GCS_PRIVATE_BUCKET="{"name":"$private","virtualHostedStyle": true}"
 * ```
 *
 */
@Global()
@Module({
  controllers: [BlobsLocalEndpointController],
  providers: [BlobsConfigMap, DiskConfigMap, storageAdaptorProvider(), BlobsService, BlobsLocalEndpointFlagInterceptor],
  exports: [BlobsService]
})
export class BlobsModule {}
