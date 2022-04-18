import '@brickdoc/dotenv/src/config'
import { env } from 'process'
import { NestFactory } from '@nestjs/core'
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

  // run server
  const port = env.SERVER_PORT ?? 3000
  await app.listen(port, () => log.log(`Listening on: http://0.0.0.0:${port}`))
}

void runCliOrServer(startServer)
