import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { fastifyHelmet } from 'fastify-helmet'

export const helmetRegister = async (app: NestFastifyApplication): Promise<void> => {
  await app.register(fastifyHelmet)
}
