import {
  Catch,
  ArgumentsHost,
  Injectable,
  Inject,
  HttpServer,
  Optional,
  HttpStatus,
  HttpException,
  NotFoundException
} from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface'
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core'
import { GqlExceptionFilter, GqlArgumentsHost, GqlContextType } from '@nestjs/graphql'
import { type ViteDevServer, VITE_DEV_SERVER, WEB_APP_ENTRYPOINT } from '@brickdoc/build-support'
import path from 'path'
import fs from 'fs'
import { env } from 'process'
import { ApolloError } from 'apollo-server-errors'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { type Logger } from 'winston'
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
  private readonly webAppEntrypoint: string = `/${WEB_APP_ENTRYPOINT}`

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject(VITE_DEV_SERVER) @Optional() private readonly viteServer?: ViteDevServer,
    @Optional() protected readonly httpAdapterHost?: HttpAdapterHost
  ) {
    if (env.NODE_ENV !== 'development') {
      const esmManifestFilePath = path.resolve(__dirname, '../../../../../public/esm-bundle/manifest.json')
      if (fs.existsSync(esmManifestFilePath)) {
        const esmManifest = JSON.parse(fs.readFileSync(esmManifestFilePath, 'utf8'))
        if (esmManifest[WEB_APP_ENTRYPOINT])
          this.webAppEntrypoint = `/esm-bundle/${esmManifest[WEB_APP_ENTRYPOINT].file}`
      }
    }
  }

  catch(exception: Error, host: ArgumentsHost): Error | void {
    const applicationRef = this.httpAdapterHost?.httpAdapter

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

  httpFilter(exception: Error, host: HttpArgumentsHost, applicationRef: AbstractHttpAdapter | HttpServer): void {
    const req = host.getRequest<FastifyRequest>()
    this.logger.error({
      trace: req.id,
      exception,
      httpRequest: reqCommonContext(req),
      context
    })
    let resp: [any, number]

    if (exception instanceof BrickdocBaseError) {
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
                httpErrorAddition: {
                  method: req.method,
                  protocol: req.protocol
                }
              }
            }
          ]
        },
        exception.code
      ]
    } else if (
      exception instanceof NotFoundException &&
      req.method === 'GET' &&
      (!req.headers['sec-fetch-dest'] || req.headers['sec-fetch-dest'] === 'document')
    ) {
      // Fallback to SPA entry html
      const reply = host.getResponse<FastifyReply>()
      const fastify: FastifyInstance = applicationRef.getInstance()
      // eslint-disable-next-line func-names
      void (async () => {
        // @ts-expect-error
        let view: string | undefined = await fastify.view('index.hbs', {
          webAppEntrypoint: this.webAppEntrypoint,
          enableGoogleAnalytics: env.NODE_ENV === 'production'
        })

        if (env.NODE_ENV === 'development') {
          view = await this.viteServer?.transformIndexHtml(req.url, view!)
        }

        void reply.header('Content-Type', 'text/html; charset=utf-8')
        void reply.send(view)
      })()
      return
    } else if (exception instanceof HttpException) {
      resp = [exception.getResponse(), exception.getStatus()]
    } else {
      resp = ['Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR]
    }
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
    applicationRef.reply(host.getArgByIndex(1), body, body.statusCode)
    this.logger.error(body.message, {
      exception,
      type: host.getType(),
      context
    })
  }
}
