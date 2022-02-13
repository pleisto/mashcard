import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { ConfigService } from '@nestjs/config'
import { KMSService } from '../kms/kms.service'
import { SecretSubKey } from '../kms/kms.interface'
import { helmetRegister } from './helmet'
import { setPinoAsLogger } from './logger'
import { cookieRegister } from './cookie'
import { sessionRegister } from './session'
import { registerDebugContext, v8InspectorEnabled } from '../utils/debugger'

export const loadInitializers = async (app: NestFastifyApplication): Promise<void> => {
  // Get Injection Service
  const kmsService = app.get(KMSService)
  const configService = app.get(ConfigService)

  // common initializers
  app.enableShutdownHooks()
  setPinoAsLogger(app)
  app.flushLogs()

  cookieRegister(app, kmsService.subKey(SecretSubKey.SECURE_COOKIE, 'signature'))
  sessionRegister(
    app,
    kmsService.subKey(SecretSubKey.SECURE_COOKIE, 'session'),
    configService.get<boolean>('application.tlsEnabled')!
  )
  await helmetRegister(app)

  // Inject context to `globalThis.ctx` when Nodejs Debugger is enabled
  if (v8InspectorEnabled) await registerDebugContext()
}
