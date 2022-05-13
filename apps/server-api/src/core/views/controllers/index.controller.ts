import { Controller, Get, Render, Optional, Inject, Req } from '@nestjs/common'
import { type ViteDevServer, VITE_DEV_SERVER, webAppEntrypointUrl } from '@brickdoc/build-support'
import { FastifyRequest } from 'fastify'
import { IS_DEV_MODE } from '../../../common/utils'

@Controller()
export class IndexController {
  private readonly webAppEntrypoint: string = webAppEntrypointUrl
  constructor(@Inject(VITE_DEV_SERVER) @Optional() private readonly viteServer?: ViteDevServer) {}

  @Get('*')
  @Render('index')
  async spaRoot(@Req() req: FastifyRequest): Promise<object> {
    const devContext = IS_DEV_MODE ? await this.viteServer?.transformIndexHtml(req.url, '') : ''

    return {
      webAppEntrypoint: this.webAppEntrypoint,
      devContext
    }
  }
}
