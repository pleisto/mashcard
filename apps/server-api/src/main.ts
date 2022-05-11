import '@brickdoc/dotenv/src/config'
import { env } from 'process'
import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { loadInitializers } from './core/initializers'
import { runCliOrServer } from './cli'
import { DEV_HTTPS_CERT, DEV_HTTPS_PRIVATE_KEY } from './certs-for-dev'

const log = new Logger('BrickdocServer')

/**
 * Create Server Application instance.
 */
async function startServer(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(
      // Enable HTTPS for local development, with a self-signed certificate.
      // Many HTTP secure headers only works under HTTPS.
      env.NODE_ENV !== 'production'
        ? {
            http2: true,
            https: {
              allowHTTP1: true,
              cert: DEV_HTTPS_CERT,
              key: DEV_HTTPS_PRIVATE_KEY
            }
          }
        : {}
    ),
    {
      bufferLogs: true
    }
  )

  // load initializers
  await loadInitializers(app)

  process.on('unhandledRejection', (reason: Error, p) => {
    const e: Error = reason instanceof Error ? reason : new Error(reason)
    log.error(`unhandledRejection: ${e.message}`, e)
  })

  process.on('uncaughtException', (e: Error) => {
    log.error(`uncaughtException: ${e.message}`, e)
  })

  // run server
  const port = env.SERVER_PORT ?? 3000
  if (env.NODE_ENV !== 'production') {
    await app.listen(port, '127.0.0.1', () => log.log(`Listening on: https://localhost:${port}`))
  } else {
    await app.listen(port, () => log.log(`Listening on: http://0.0.0.0:${port}`))
  }
}

void runCliOrServer(startServer)
