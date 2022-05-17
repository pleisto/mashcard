import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

/**
 * Set Winston to the application logger
 */
export const loggerRegister = (app: NestFastifyApplication): void => {
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  app.flushLogs()
}
