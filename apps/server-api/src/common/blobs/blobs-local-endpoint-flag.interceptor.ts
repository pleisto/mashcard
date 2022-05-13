import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { BlobsService } from './blobs.service'
import { LocalEndpointUnsupportedError } from './blobs.errors'

/**
 * Check storage adaptor required local HTTP endpoint or not
 */
@Injectable()
export class BlobsLocalEndpointFlagInterceptor implements NestInterceptor {
  constructor(private readonly blobsService: BlobsService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Skip if local endpoint enabled
    if (this.blobsService.enabledStorageOverLocalHttpService()) return next.handle()

    // Throw error if storage adaptor does not support local endpoint
    return throwError(() => new LocalEndpointUnsupportedError())
  }
}
