import { Logger } from '@nestjs/common'
import { NestFastifyApplication } from '@nestjs/platform-fastify'

export const uncaughtHandlerRegister = (_app: NestFastifyApplication, log: Logger): void => {
  process.on('unhandledRejection', (reason: Error, p) => {
    const e: Error = reason instanceof Error ? reason : new Error(reason)
    log.error(`unhandledRejection: ${e.message}`, e)
  })

  process.on('uncaughtException', (e: Error) => {
    log.error(`uncaughtException: ${e.message}`, e)
  })
}
