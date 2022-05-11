import { Test } from '@nestjs/testing'
import { ViteDevServer } from 'vite'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { WebAppModule } from '../web-app.module'
import { VITE_DEV_SERVER } from '../web-app.constants'

describe('WebAppModule', () => {
  let app: NestFastifyApplication
  let viteServer: ViteDevServer

  beforeAll(async () => {
    globalThis.__enableViteDevServer__ = true
    const moduleRef = await Test.createTestingModule({
      imports: [WebAppModule]
    }).compile()
    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
    viteServer = app.get<ViteDevServer>(VITE_DEV_SERVER)
  })

  afterAll(async () => {
    globalThis.__enableViteDevServer__ = false
    await app.close()
  })

  it('should export VITE_DEV_SERVER', async () => {
    expect(viteServer).toBeTruthy()
  })

  it('can forward request to vite server', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/__vite_ping'
    })
    expect(res.body).toBe('pong')
  })

  it('can transform TS/TSX files on the fly', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/apps/client-web/src/BrickdocGraphQL.ts'
    })
    expect(res.body).toContain('node_modules')
  })
})
