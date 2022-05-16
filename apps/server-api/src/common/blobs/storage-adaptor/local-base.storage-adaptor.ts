import { BaseStorageAdaptor } from './base.storage-adaptor'
import { Result, err, ok, isNonEmptyString } from '@brickdoc/active-support'
import { stringify, parse, ParsedUrlQuery } from 'node:querystring'
import { STORAGE_BUCKETS } from '../blobs.interface'
import { SettingsService } from '../../settings'
import { KMSService, SecretSubKey } from '../../kms'
import { genericHash } from '@brickdoc/server-api-crate'
import { NotFoundKeyError, AccessDeniedError } from '../blobs.errors'
import { format } from 'date-fns'

/**
 * AWS S3 v4 signature-style QueryString parameters
 */
export enum QueryParams {
  Date = 'X-Brd-Date',
  Expires = 'X-Brd-Expires',
  Signature = 'X-Brd-Signature',
  Algorithm = 'X-Brd-Algorithm',
  Credential = 'X-Brd-Credential',
  SignedHeaders = 'X-Brd-SignedHeaders'
}

export interface SignatureQueryParams {
  [QueryParams.Date]: string
  [QueryParams.Expires]: string
  [QueryParams.Signature]?: string
  [QueryParams.Algorithm]?: string
  [QueryParams.Credential]?: string
  [QueryParams.SignedHeaders]?: string
}

/**
 * Abstract class for implementing a local blob storage adaptor, such as disk, smb, ftp, etc.
 *
 * If you need to implement a new adaptor for an internet-accessible cloud storage service such as AWS S3,
 * it is highly recommended extend `BaseStorageAdaptor` class directly.
 */
export abstract class LocalBaseStorageAdaptor extends BaseStorageAdaptor {
  static DateQueryParam = 'X-Brd-Date'
  static ExpiresQueryParam = 'X-Brd-Expires'
  static SignatureQueryParam = 'X-Brd-Signature'
  static AlgorithmQueryParam = 'X-Brd-Algorithm'
  static CredentialQueryParam = 'X-Brd-Credential'
  static SignedHeadersQueryParam = 'X-Brd-SignedHeaders'

  constructor(protected readonly settings: SettingsService, protected readonly kms: KMSService) {
    super()
    this.storageOverLocalHttpService = true
  }

  /**
   * static value for aws s3 signature v4 mock
   */
  public readonly scope: string = `${format(new Date(), 'yyyyMMdd')}/brickdoc-srv/local_blobs/brd4_request`
  public readonly credential: string = `BlobsService/${this.scope}`
  public readonly algorithm: string = 'BRD4-HMAC-BLAKE3'
  public readonly signedHeaders: string = 'host'
  public readonly host: string = '*'

  /**
   * Do not change this property. It is used to enable BlobController to provide local HTTP endpoint
   * for blob download/upload.
   */
  storageOverLocalHttpService = true

  protected async endpoint(bucket: STORAGE_BUCKETS, key: string): Promise<string> {
    const host = (await this.settings.get<string>('core.appUrl'))._unsafeUnwrap()!
    return new URL(`/blobs/${bucket}/${key}`, host).toString()
  }

  async directDownloadUrl(bucket: STORAGE_BUCKETS, key: string, expires: number): Promise<string> {
    return await this.signedUrl('get', bucket, key, expires)
  }

  async directUploadUrl(bucket: STORAGE_BUCKETS, key: string, expires: number): Promise<string> {
    return await this.signedUrl('put', bucket, key, expires)
  }

  /**
   * Generate a signed url for blob download/upload
   */
  protected async signedUrl(
    method: 'get' | 'put',
    bucket: STORAGE_BUCKETS,
    key: string,
    expires: number
  ): Promise<string> {
    const endpoint = await this.endpoint(bucket, key)
    // Get blobs from public bucket does not require signature
    if (bucket === STORAGE_BUCKETS.PUBLIC && method === 'get') return endpoint

    const queryString = this.signedQueryParams(method, bucket, key, {
      [QueryParams.Date]: new Date().toISOString(),
      [QueryParams.Expires]: expires.toString()
    })
    return `${endpoint}?${queryString}`
  }

  /**
   * handle download request from BlobLocalEndpointController
   */
  async handleDownloadRequest(
    bucket: STORAGE_BUCKETS,
    key: string,
    params: string | ParsedUrlQuery
  ): Promise<Result<ReadableStream, Error>> {
    if (STORAGE_BUCKETS.PRIVATE === bucket && !this.authSignedRequest('get', bucket, key, params)) {
      return err(new AccessDeniedError())
    }

    const blob = await this.get(bucket, key)
    if (blob === undefined) return err(new NotFoundKeyError(key))

    return ok(blob as unknown as ReadableStream)
  }

  /**
   * Authenticate signature request
   */
  public authSignedRequest(
    method: 'put' | 'get',
    bucket: STORAGE_BUCKETS,
    key: string,
    queryString: string | ParsedUrlQuery
  ): boolean {
    const params = (typeof queryString === 'string'
      ? parse(queryString)
      : queryString) as unknown as SignatureQueryParams
    // expired timestamp
    const expiredTime =
      Date.parse(params[QueryParams.Date]) +
      // seconds to milliseconds
      parseInt(params[QueryParams.Expires], 10) * 1000

    if (
      !isNonEmptyString(params[QueryParams.Signature]) ||
      isNaN(expiredTime) ||
      expiredTime < Date.now() ||
      parse(this.signedQueryParams(method, bucket, key, params))[QueryParams.Signature] !==
        params[QueryParams.Signature]
    ) {
      return false
    } else {
      return true
    }
  }

  protected signedQueryParams(
    method: 'put' | 'get',
    bucket: STORAGE_BUCKETS,
    key: string,
    params: SignatureQueryParams
  ): string {
    const date = params[QueryParams.Date]
    const expires = params[QueryParams.Expires]

    const baseQueryParams: string = stringify({
      [QueryParams.Algorithm]: this.algorithm,
      [QueryParams.Credential]: this.credential,
      [QueryParams.Date]: date,
      [QueryParams.Expires]: expires,
      [QueryParams.SignedHeaders]: this.signedHeaders
    })

    const request = [
      this.algorithm,
      date,
      this.scope,
      genericHash(
        [method, `/${bucket}/${key}`, baseQueryParams, `host: ${this.host}`, '', 'host', 'UNSIGNED-PAYLOAD'].join('\n')
      )
    ].join('\n')
    const signature = [date, request].reduce(
      (acc, x) => genericHash(x, this.kms.subKey(SecretSubKey.DATA_ENCRYPTION, acc)),
      `BRD4:common.blobs.local`
    )

    return `${baseQueryParams}&${QueryParams.Signature}=${signature}`
  }
}
