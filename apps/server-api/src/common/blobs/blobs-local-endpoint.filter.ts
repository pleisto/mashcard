import { Catch, ArgumentsHost, Injectable, Inject, Optional, ExceptionFilter } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { base58Encode } from '@brickdoc/server-api-crate'
import { FastifyRequest } from 'fastify'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { type Logger } from 'winston'
import { BlobsError } from './blobs.errors'
import { requestLoggingContext } from '../utils'

@Injectable()
@Catch(BlobsError)
export class BlobsLocalEndpointExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Optional() protected readonly httpAdapterHost?: HttpAdapterHost
  ) {}

  catch(exception: BlobsError, host: ArgumentsHost): void {
    const applicationRef = this.httpAdapterHost?.httpAdapter
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<FastifyRequest>()
    const response = ctx.getResponse<FastifyRequest>()
    this.logger.warn({
      trace: request.id,
      exception,
      httpRequest: requestLoggingContext(request),
      context: 'BlobsLocalEndpointExceptionFilter'
    })
    applicationRef!.status(response, exception.code)
    applicationRef!.setHeader(response, 'Content-Type', 'application/xml')
    ;(response as any).view('XMLError', {
      code: exception.xmlCode,
      message: exception.message,
      requestId: request.id,
      host: base58Encode(request.hostname),
      details: Object.entries(exception.details)
    })
  }
}
