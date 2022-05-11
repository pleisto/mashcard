import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { env } from 'process'
import path from 'path'
import { createServer as createViteServer } from 'vite'
import { WebAppAssetHostMiddleware } from './web-app-asset-host.middleware'
import { VITE_DEV_SERVER } from './web-app.constants'
import { http2DevServerConfig } from '../utils'

@Module({
  providers: [
    {
      provide: VITE_DEV_SERVER,
      async useFactory() {
        if (env.NODE_ENV !== 'development' && !globalThis.__enableViteDevServer__) return
        return await createViteServer({
          configFile: path.resolve(__dirname, '../vite.config.ts'),
          server: {
            middlewareMode: 'ssr',
            https: {
              cert: http2DevServerConfig.https.cert,
              key: http2DevServerConfig.https.key
            },
            watch: {
              ignored: ['**/coverage', '**/dist', '**/tmp']
            }
          }
        })
      }
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
