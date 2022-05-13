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
 */
@Global()
@Module({
  controllers: [BlobsLocalEndpointController],
  providers: [BlobsConfigMap, DiskConfigMap, storageAdaptorProvider(), BlobsService, BlobsLocalEndpointFlagInterceptor],
  exports: [BlobsService]
})
export class BlobsModule {}
