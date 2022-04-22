import { Plugin } from '@nestjs/apollo'
import { Inject } from '@nestjs/common'
import { ApolloServerPlugin, GraphQLRequestListener, GraphQLRequestContext } from 'apollo-server-plugin-base'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
  async requestDidStart(requestContext: GraphQLRequestContext): Promise<GraphQLRequestListener> {
    const logger = this.logger.child({
      request: {
        trackId: requestContext.request.http?.headers?.get('x-request-id'),
        ip: requestContext.request.http?.headers?.get('x-forwarded-for'),
        protocol: requestContext.request.http?.headers?.get('x-forwarded-proto'),
        userAgent: requestContext.request.http?.headers?.get('user-agent'),
        acceptLanguage: requestContext.request.http?.headers?.get('accept-language'),
        method: requestContext.request.http?.method,
        url: requestContext.request.http?.url,
        operationName: requestContext.request.operationName
      },
      context: 'GraphQLModule'
    })
    logger.debug('GraphQL request started')
    const profiler = logger.startTimer()
    return {
      async willSendResponse() {
        profiler.done('GraphQL request finished')
      }
    }
  }
}
