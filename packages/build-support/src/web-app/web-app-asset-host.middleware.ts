import { Injectable, NestMiddleware, Inject, Optional, OnModuleDestroy } from '@nestjs/common'
import { IncomingMessage, ServerResponse } from 'http'
import { type ViteDevServer } from 'vite'
import { VITE_DEV_SERVER } from './web-app.constants'

@Injectable()
export class WebAppAssetHostMiddleware implements NestMiddleware, OnModuleDestroy {
  constructor(@Inject(VITE_DEV_SERVER) @Optional() private readonly viteServer?: ViteDevServer) {}
  use(req: IncomingMessage, res: ServerResponse, next: Function | undefined): void {
    if (this.viteServer) {
      this.viteServer.middlewares(req, res, next)
    } else {
      next?.()
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.viteServer?.close()
  }
}
