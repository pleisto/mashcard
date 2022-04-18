import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { ConfigService } from '@nestjs/config'
import { KMSService } from '../../common/kms/kms.service'
import { SecretSubKey } from '../../common/kms/kms.interface'
import { helmetRegister } from './helmet'
import { cookieRegister } from './cookie'
import { sessionRegister } from './session'
import { registerDebugContext } from './debugger'

/**
 * loadInitializers will be called by `/main.ts` when the application is bootstrapped and listening for connections.
 */
export const loadInitializers = async (app: NestFastifyApplication): Promise<void> => {
  // Get Injection Service
  const kmsService = app.get(KMSService)
  const configService = app.get(ConfigService)

  // common initializers
  app.enableShutdownHooks()
  app.flushLogs()

  cookieRegister(app, kmsService.subKey(SecretSubKey.SECURE_COOKIE, 'signature'))
  sessionRegister(
    app,
    kmsService.subKey(SecretSubKey.SECURE_COOKIE, 'session'),
    configService.get<boolean>('application.tlsEnabled')!
  )
  await helmetRegister(app)

  // Inject context to `globalThis.ctx` when Nodejs Debugger is enabled
  const v8InspectorEnabled =
    typeof (globalThis as any).v8debug === 'object' || /--debug|--inspect/.test(process.execArgv.join(' '))
  if (v8InspectorEnabled) await registerDebugContext()
}
