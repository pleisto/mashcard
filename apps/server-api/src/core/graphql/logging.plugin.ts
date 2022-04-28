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
      trace: requestContext.request.http?.headers?.get('x-request-id'),
      httpRequest: {
        remoteIp: requestContext.request.http?.headers?.get('x-forwarded-for'),
        protocol: requestContext.request.http?.headers?.get('x-forwarded-proto'),
        userAgent: requestContext.request.http?.headers?.get('user-agent'),
        acceptLanguage: requestContext.request.http?.headers?.get('accept-language'),
        requestMethod: requestContext.request.http?.method,
        requestUrl: requestContext.request.http?.url,
        operationName: requestContext.request.operationName,
        referer: requestContext.request.http?.headers?.get('referer')
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
