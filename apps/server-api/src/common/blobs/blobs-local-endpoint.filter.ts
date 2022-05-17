import { Catch, ArgumentsHost, Injectable, Inject, Optional, ExceptionFilter } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { base58Encode } from '@brickdoc/server-api-crate'
import { FastifyError } from '@fastify/error'
import { FastifyRequest } from 'fastify'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { type Logger } from 'winston'
import { BlobsError } from './blobs.errors'
import { requestLoggingContext } from '../utils'

@Injectable()
@Catch()
export class BlobsLocalEndpointExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Optional() protected readonly httpAdapterHost?: HttpAdapterHost
  ) {}

  catch(exception: BlobsError | FastifyError, host: ArgumentsHost): void {
    // Only handle the error when it is a BlobsError or FastifyError
    if (!(exception instanceof BlobsError) && exception.name !== 'FastifyError') {
      throw exception
    }

    const applicationRef = this.httpAdapterHost?.httpAdapter
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<FastifyRequest>()
    const response = ctx.getResponse<FastifyRequest | any>()
    this.logger.warn({
      trace: request.id,
      exception,
      httpRequest: requestLoggingContext(request),
      context: 'BlobsLocalEndpointExceptionFilter'
    })
    const [statusCode, code, details] =
      exception instanceof BlobsError
        ? [exception.code, exception.xmlCode, exception?.details]
        : [
            exception?.statusCode ?? 500,
            // remove `FST_` prefix. e.g. `FST_BAD_REQUEST` -> `BAD_REQUEST`
            (exception?.code || exception?.name).replace('FST_', ''),
            undefined
          ]
    applicationRef!.status(response, statusCode as number)
    applicationRef!.setHeader(response, 'Content-Type', 'application/xml')
    response.view('XMLError', {
      code,
      details: details ? Object.entries(details) : undefined,
      message: exception.message,
      requestId: request.id,
      host: base58Encode(request.hostname)
    })
  }
}
