import { NestFactory } from '@nestjs/core'
import { ServerModule } from './server.module'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { loadInitializers } from './common/initializers'
import { MicroserviceOptions } from '@nestjs/microservices'
import { grpcClientOptions } from './anti-corruption/grpc/grpc-client.options'

/**
 * Create Server Application instance.
 */
async function startServer(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(ServerModule, new FastifyAdapter(), { bufferLogs: true })

  // load initializers
  await loadInitializers(app)

  // anti-corruption layer grpc service
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions)
  await app.startAllMicroservices()

  const configService = app.get(ConfigService)
  const port = configService.get<number>('application.port')!
  const log = new Logger('BrickdocServer')

  await app.listen(port, () => {
    log.log(`Listening on: http://0.0.0.0:${port}`)
  })
}

void startServer()
