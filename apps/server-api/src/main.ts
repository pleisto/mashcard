import '@brickdoc/dotenv/src/config'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { loadInitializers } from './core/initializers'
import { runCliOrServer } from './cli'

const log = new Logger('BrickdocServer')

/**
 * Create Server Application instance.
 */
async function startServer(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { bufferLogs: true })

  // load initializers
  await loadInitializers(app)

  const configService = app.get(ConfigService)
  const port = configService.get<number>('application.port')!

  await app.listen(port, () => {
    log.log(`Listening on: http://0.0.0.0:${port}`)
  })
}

void runCliOrServer(startServer)
