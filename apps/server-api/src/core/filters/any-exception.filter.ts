import {
  Catch,
  ArgumentsHost,
  Injectable,
  Inject,
  HttpServer,
  Optional,
  HttpStatus,
  HttpException
} from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface'
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core'
import { GqlExceptionFilter, GqlArgumentsHost, GqlContextType } from '@nestjs/graphql'
import { ApolloError } from 'apollo-server-errors'
import { FastifyRequest } from 'fastify'
import { FastifyError } from '@fastify/error'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { type Logger } from 'winston'
import { requestLoggingContext } from '../../common/utils'
import { BrickdocBaseError, ErrorCode } from '../../common/errors'
import { CustomApolloError } from '../graphql/custom-apollo-error.errors'

const context = 'AnyExceptionFilter'

/**
 * AnyExceptionFilter is a **global** filter that catches any exception thrown by the application.
 * Any exception thrown by the application will be converted to a custom error response and logged.
 */
@Injectable()
@Catch()
export class AnyExceptionFilter implements GqlExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Optional() protected readonly httpAdapterHost?: HttpAdapterHost
  ) {}

  catch(exception: Error, host: ArgumentsHost): Error | void {
    const applicationRef = this.httpAdapterHost?.httpAdapter
    /**
     * NestJS has many types of execution context.
     * @see https://docs.nestjs.com/fundamentals/execution-context
     */
    switch (host.getType<GqlContextType>()) {
      case 'graphql':
        return this.graphQLFilter(exception, GqlArgumentsHost.create(host))
      case 'http':
        return this.httpFilter(exception, host.switchToHttp(), applicationRef!)
      default:
        return this.unknownFilter(exception, host, applicationRef!)
    }
  }

  /**
   * Called when an exception is thrown during a GraphQL execution context.
   */
  graphQLFilter(exception: Error, host: GqlArgumentsHost): Error {
    const req = host.getContext().req as FastifyRequest
    // TODO req can be undefined
    const httpRequest = req?.id
      ? {
          ...requestLoggingContext(req),
          query: (req?.body as any)?.query,
          operationName: (req?.body as any)?.operationName
        }
      : {}

    const graphQLError = new CustomApolloError(exception.name, exception.message)
    graphQLError.stack = exception.stack

    if (exception instanceof BrickdocBaseError) {
      graphQLError.extensions.code = ErrorCode[exception.code]
      graphQLError.extensions.codeStatus = exception.code
      graphQLError.extensions.apiVersion = 'server-api.brickdoc.io/v1'
      graphQLError.extensions.kind = `${exception.name}`
      graphQLError.extensions.details = {
        time: new Date().toISOString(),
        traceId: req?.id,
        ...exception.details
      }
      graphQLError.originalError = exception.originalError
      const logLevel = exception.code >= 500 ? 'error' : 'warn'
      this.logger.log(logLevel, { trace: req?.id, httpRequest, exception, context })
    } else {
      this.logger.error({ trace: req?.id, httpRequest, exception, context })
      graphQLError.originalError = exception
    }

    // Don't re-wrap ApolloError
    if (exception instanceof ApolloError) return exception

    return graphQLError
  }

  /**
   * Called when an exception is thrown during a HTTP execution context.
   */
  httpFilter(exception: Error, host: HttpArgumentsHost, applicationRef: AbstractHttpAdapter | HttpServer): void {
    const req = host.getRequest<FastifyRequest>()

    let resp: [any, number]
    let logLevel: 'error' | 'warn'

    if (exception instanceof BrickdocBaseError) {
      logLevel = 'warn'
      /**
       * This response compatible with GraphQL Error format, that client could easily parse.
       * @see https://github.com/graphql/graphql-spec/blob/main/spec/Section%207%20--%20Response.md#errors
       */
      resp = [
        {
          message: exception.message,
          errors: [
            {
              extensions: {
                code: exception.code,
                details: {
                  time: new Date().toISOString(),
                  traceId: req.id,
                  ...exception.details
                },
                httpExecutionContext: {
                  // Any properties that are not defined in **GraphQL** execution context, should be added here.
                  method: req.method,
                  protocol: req.protocol
                }
              }
            }
          ]
        },
        exception.code
      ]
    } else if (exception instanceof HttpException) {
      logLevel = 'warn'
      resp = [exception.getResponse(), exception.getStatus()]
    } else if (
      // `@fastify/error` is export `FastifyError` **interface** only.
      // so we need use `exception?.name` as assertion.
      exception?.name === 'FastifyError'
    ) {
      logLevel = 'warn'
      resp = [exception.message, (exception as FastifyError)?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR]
    } else {
      // Unknown error should use `error` level
      logLevel = 'error'
      resp = ['Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR]
    }

    this.logger.log(logLevel, {
      trace: req.id,
      exception,
      httpRequest: requestLoggingContext(req),
      context
    })
    applicationRef.reply(host.getResponse(), ...resp)
  }

  /**
   * Handles an exception thrown unknown adapter type.
   * @param exception
   * @param host
   * @param applicationRef
   * @returns
   */
  unknownFilter(exception: Error, host: ArgumentsHost, applicationRef: AbstractHttpAdapter | HttpServer): void {
    const body = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unknown Exception Throw in AnyExceptionFilter'
    }
    this.logger.error(body.message, {
      exception,
      type: host.getType(),
      context
    })
    applicationRef.reply(host.getArgByIndex(1), body, body.statusCode)
  }
}
