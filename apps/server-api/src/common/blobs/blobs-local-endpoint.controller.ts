/* eslint-disable max-params */
import { lookup } from 'mime-types'
import { ParsedUrlQuery } from 'node:querystring'
import { finished } from 'node:stream/promises'
import {
  Controller,
  Get,
  Put,
  UseInterceptors,
  UseFilters,
  Inject,
  Param,
  Query,
  Res,
  Req,
  HttpStatus
} from '@nestjs/common'
import { isNonEmptyString } from '@brickdoc/active-support'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { BlobsLocalEndpointFlagInterceptor } from './blobs-local-endpoint-flag.interceptor'
import { LocalBaseStorageAdaptor } from './storage-adaptor/local-base.storage-adaptor'
import { BLOB_STORAGE, STORAGE_BUCKETS } from './blobs.interface'
import { InvalidBucketError, NotFoundKeyError, ObjectUploadFailedError } from './blobs.errors'
import { BlobsLocalEndpointExceptionFilter } from './blobs-local-endpoint.filter'

/**
 * This controller provides a local endpoint for blob storage which is not supported directly accessible from the url.
 */
@UseFilters(
  // The response is XML-based, considering that it is as compatible as possible with AWS S3 API
  BlobsLocalEndpointExceptionFilter
)
@UseInterceptors(
  // Should only work when adaptor is local-based.
  // Otherwise, it will throw an bad request error.
  BlobsLocalEndpointFlagInterceptor
)
@Controller('blobs')
export class BlobsLocalEndpointController {
  constructor(
    /**
     * Don't inject BlobsService to this controller.
     *
     * In fact it is the backend of BlobsService, and it is independent of the `blobs` table in the database.
     * So we just need to inject the local storage adaptor instead.
     */
    @Inject(BLOB_STORAGE) private readonly storage: LocalBaseStorageAdaptor
  ) {}

  /**
   * This endpoint is used to download a file from the local storage.
   */
  @Get(':bucket/*')
  async findOne(
    @Param('bucket') bucket: string,
    @Param('*') key: string,
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Query('response-content-disposition') respDisposition?: string
  ): Promise<void> {
    this.validBucketAndKey(bucket, key)
    const result = await this.storage.handleDownloadRequest(bucket as STORAGE_BUCKETS, key, req.query as ParsedUrlQuery)

    // If has error, return error response
    if (result.isErr()) throw result.error

    // If success, reply with the file
    await reply
      // Lockup content-type by file extension, or fallback to `application/octet-stream`
      .header('Content-Type', lookup(key) ?? 'application/octet-stream')
      /**
       * In a regular HTTP response, the Content-Disposition response header is a header indicating
       * if the content is expected to be displayed inline in the browser, that is, as a Web page or
       * as part of a Web page, or as an attachment, that is downloaded and saved locally.
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition
       */
      .header('Content-Disposition', respDisposition ?? 'inline')
      .send(result.value)
  }

  /**
   * This endpoint is used to upload a file to the local storage.
   */
  @Put(':bucket/*')
  async create(
    @Param('bucket') bucket: string,
    @Param('*') key: string,
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ): Promise<void> {
    this.validBucketAndKey(bucket, key)
    const result = await this.storage.handleUploadRequest(bucket as STORAGE_BUCKETS, key, req.query as ParsedUrlQuery)

    // If has error, return error response
    if (result.isErr()) throw result.error
    result.value.on('error', err => {
      // trigged when the upload is failed
      throw new ObjectUploadFailedError(key, err?.message || err?.name, err)
    })

    // Try write stream
    const stream = req.raw.pipe(result.value)

    // Wait for the stream to finish
    await finished(stream)

    // If file is uploaded successfully, return empty response with status code 204
    await reply
      /**
       * The status code `204 No Content` suites better than `201 Created`, because response with code 201 not only
       * means "created" but "the new resource is returned in the body of the message".
       * @see https://httpwg.org/specs/rfc7231.html#status.201
       */
      .code(HttpStatus.NO_CONTENT)
      // Just send some custom headers to help the client to know that the file is uploaded successfully
      .header('X-brd-stored-status', 1)
      .header('x-brd-stored-content-length', req.headers['content-length'])
      .header('Content-Type', 'text/plain')
      .send()
  }

  /**
   * Check if the bucket is valid and key param is not empty
   * @param bucket the bucket name
   * @param key the blob key
   */
  private validBucketAndKey(bucket: string, key: string): void {
    if (!(Object.values(STORAGE_BUCKETS) as string[]).includes(bucket)) throw new InvalidBucketError(bucket)
    if (!isNonEmptyString(key)) throw new NotFoundKeyError(key)
  }
}
