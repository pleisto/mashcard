/* eslint-disable max-params */
import { lookup } from 'mime-types'
import { ParsedUrlQuery } from 'node:querystring'
import { Controller, Get, UseInterceptors, UseFilters, Inject, Param, Query, Res, Req } from '@nestjs/common'
import { isNonEmptyString } from '@brickdoc/active-support'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { BlobsLocalEndpointFlagInterceptor } from './blobs-local-endpoint-flag.interceptor'
import { LocalBaseStorageAdaptor, QueryParams } from './storage-adaptor/local-base.storage-adaptor'
import { BLOB_STORAGE, STORAGE_BUCKETS } from './blobs.interface'
import { InvalidBucketError, NotFoundKeyError } from './blobs.errors'
import { BlobsLocalEndpointExceptionFilter } from './blobs-local-endpoint.filter'

/**
 * This controller provides a local endpoint for blob storage which is not supported directly accessible from the url.
 * So don't inject BlobsService to this controller. In fact it is the backend of BlobsService, and it is independent
 * of the `blobs` table in the database.
 *
 * The response is XML-based, considering that it is as compatible as possible with AWS S3 API.
 */
@UseFilters(BlobsLocalEndpointExceptionFilter)
@UseInterceptors(BlobsLocalEndpointFlagInterceptor)
@Controller('blobs')
export class BlobsLocalEndpointController {
  constructor(@Inject(BLOB_STORAGE) private readonly storage: LocalBaseStorageAdaptor) {}

  @Get('/:bucket/*')
  async findOne(
    @Param('bucket') bucket: string,
    @Param('*') key: string,
    @Query(QueryParams.Signature) sign: string,
    @Query(QueryParams.Date) date: string,
    @Query(QueryParams.Expires) expires: string,
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ): Promise<void> {
    if (!(Object.values(STORAGE_BUCKETS) as string[]).includes(bucket)) throw new InvalidBucketError(bucket)
    if (!isNonEmptyString(key)) throw new NotFoundKeyError(key)

    const result = await this.storage.handleDownloadRequest(bucket as STORAGE_BUCKETS, key, req.query as ParsedUrlQuery)
    if (result.isErr()) throw result.error
    await reply.header('Content-Type', lookup(key) ?? 'application/octet-stream').send(result.value)
  }
}
