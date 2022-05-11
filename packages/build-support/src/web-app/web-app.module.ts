import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { env } from 'process'
import path from 'path'
import { createServer as createViteServer } from 'vite'
import { WebAppAssetHostMiddleware } from './web-app-asset-host.middleware'
import { VITE_DEV_SERVER } from './web-app.constants'

@Module({
  providers: [
    {
      provide: VITE_DEV_SERVER,
      async useFactory(adapterHost: HttpAdapterHost) {
        if (env.NODE_ENV !== 'development' && !globalThis.__enableViteDevServer__) return
        const server = adapterHost.httpAdapter.getHttpServer()
        return await createViteServer({
          configFile: path.resolve(__dirname, '../vite.config.ts'),
          server: { middlewareMode: 'ssr', hmr: { server, clientPort: parseInt(env.SERVER_PORT ?? '3000', 10) } }
        })
      },
      inject: [HttpAdapterHost]
    },
    WebAppAssetHostMiddleware
  ],
  exports: [VITE_DEV_SERVER]
})
export class WebAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(WebAppAssetHostMiddleware).forRoutes('/')
  }
}
