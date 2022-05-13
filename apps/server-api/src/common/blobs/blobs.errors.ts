/* eslint-disable max-classes-per-file */
import { BrickdocBaseError, ErrorCode } from '../errors'

export class BlobsError extends BrickdocBaseError {
  xmlCode: string
  constructor(name: string, message: string, originalError?: Error) {
    super(`common.blobs.${name}`, message, originalError)
    this.xmlCode = this.xmlCode || name.split('.').slice(-1)[0]
  }
}

export class LocalEndpointUnsupportedError extends BlobsError {
  constructor() {
    super('LOCAL_ENDPOINT_UNSUPPORTED', 'Current storage adaptor does not support local endpoint')
    this.code = ErrorCode.BAD_USER_INPUT
  }
}

export class InvalidBucketError extends BlobsError {
  constructor(bucket: string) {
    super('INVALID_BUCKET', 'The specified bucket does not exist')
    this.xmlCode = 'NoSuchBucket'
    this.code = ErrorCode.BAD_USER_INPUT
    this.details = {
      BucketName: bucket
    }
  }
}

export class NotFoundKeyError extends BlobsError {
  constructor(key: string) {
    super('NOT_FOUND_KEY', 'The specified key does not exist')
    this.xmlCode = 'NoSuchKey'
    this.code = ErrorCode.NOT_FOUND
    this.details = {
      Key: key
    }
  }
}

export class AccessDeniedError extends BlobsError {
  constructor() {
    super('ACCESS_DENIED', 'Access denied, signature does not match or the request has expired')
    this.xmlCode = 'AccessDenied'
    this.code = ErrorCode.FORBIDDEN
  }
}
