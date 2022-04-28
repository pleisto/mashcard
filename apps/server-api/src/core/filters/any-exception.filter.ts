import { Catch, ArgumentsHost, Injectable, Inject } from '@nestjs/common'
import { GqlExceptionFilter, GqlArgumentsHost, GqlContextType } from '@nestjs/graphql'
import { ApolloError } from 'apollo-server-errors'
import { FastifyRequest } from 'fastify'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { BrickdocBaseError, ErrorCode } from '../../common/errors'
import { CustomApolloError } from '../graphql/custom-apollo-error.errors'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const reqCommonContext = (req: FastifyRequest) => ({
  remoteIp: req.ip,
  protocol: req.protocol,
  requestMethod: req.method,
  requestUrl: req.url,
  params: req.params,
  userAgent: req.headers['user-agent'],
  acceptLanguage: req.headers['accept-language'],
  referer: req.headers.referer
})

const context = 'AnyExceptionFilter'

@Injectable()
@Catch()
export class AnyExceptionFilter implements GqlExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
  catch(exception: Error, host: ArgumentsHost): Error {
    switch (host.getType<GqlContextType>()) {
      case 'graphql':
        return this.graphQLFilter(exception, GqlArgumentsHost.create(host))
      default:
        // eslint-disable-next-line no-case-declarations
        const req = host.switchToHttp().getRequest<FastifyRequest>()
        this.logger.error('Non-GraphQL Exception in AnyExceptionFilter', {
          trace: req.id,
          exception,
          httpRequest: reqCommonContext(req),
          type: host.getType(),
          context
        })
        return exception
    }
  }

  /**
   * Called when an exception is thrown during a GraphQL execution context.
   */
  graphQLFilter(exception: Error, host: GqlArgumentsHost): Error {
    const req = host.getContext().req as FastifyRequest
    const httpRequest = {
      ...reqCommonContext(req),
      query: (req.body as any)?.query,
      operationName: (req.body as any)?.operationName
    }

    const graphQLError = new CustomApolloError(exception.name, exception.message)
    graphQLError.stack = exception.stack

    if (exception instanceof BrickdocBaseError) {
      graphQLError.extensions.code = ErrorCode[exception.code]
      graphQLError.extensions.codeStatus = exception.code
      graphQLError.extensions.apiVersion = 'server-api.brickdoc.io/v1'
      graphQLError.extensions.kind = `${exception.name}`
      graphQLError.extensions.details = {
        time: new Date().toISOString(),
        traceId: req.id,
        ...exception.details
      }
      graphQLError.originalError = exception.originalError
      const logLevel = exception.code >= 500 ? 'error' : 'info'
      this.logger.log(logLevel, { trace: req.id, httpRequest, exception, context })
    } else {
      this.logger.error({ trace: req.id, httpRequest, exception, context })
      graphQLError.originalError = exception
    }

    // Don't re-wrap ApolloError
    if (exception instanceof ApolloError) return exception

    return graphQLError
  }
}
