import { Controller, Get, Render, Optional, Inject, Req } from '@nestjs/common'
import { type ViteDevServer, VITE_DEV_SERVER, webAppEntrypointUrl } from '@brickdoc/build-support'
import { FastifyRequest } from 'fastify'
import { env } from 'process'

@Controller()
export class IndexController {
  private readonly webAppEntrypoint: string = webAppEntrypointUrl
  constructor(@Inject(VITE_DEV_SERVER) @Optional() private readonly viteServer?: ViteDevServer) {}

  @Get('*')
  @Render('index')
  async spaRoot(@Req() req: FastifyRequest): Promise<object> {
    const devContext = env.NODE_ENV === 'development' ? await this.viteServer?.transformIndexHtml(req.url, '') : ''

    return {
      webAppEntrypoint: this.webAppEntrypoint,
      devContext
    }
  }
}
