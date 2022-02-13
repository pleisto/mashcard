import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { Logger } from 'nestjs-pino'

export const setPinoAsLogger = (app: NestFastifyApplication): void => {
  app.useLogger(app.get(Logger))
}
