import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { SettingsService } from '../../common/settings'
import { KMSService } from '../../common/kms/kms.service'
import { SecretSubKey } from '../../common/kms/kms.interface'
import { helmetRegister } from './helmet.register'
import { cookieRegister } from './cookie.register'
import { sessionRegister } from './session.register'
import { debugContextRegister } from './debugger.register'
import { initCheckRegister } from './init-check.register'

/**
 * loadInitializers will be called by `/main.ts` when the application is bootstrapped and listening for connections.
 */
export const loadInitializers = async (app: NestFastifyApplication): Promise<void> => {
  await initCheckRegister(app)

  // Get Injection Service
  const kmsService = app.get(KMSService)
  const settingsService = app.get(SettingsService)

  // common initializers
  app.enableShutdownHooks()
  app.flushLogs()

  cookieRegister(app, kmsService.subKey(SecretSubKey.SECURE_COOKIE, 'signature'))
  sessionRegister(
    app,
    kmsService.subKey(SecretSubKey.SECURE_COOKIE, 'session'),
    (await settingsService.get<boolean>('core.tlsEnabled'))!
  )
  await helmetRegister(app)

  // Inject context to `globalThis.ctx` when Nodejs Debugger is enabled
  const v8InspectorEnabled =
    typeof (globalThis as any).v8debug === 'object' || /--debug|--inspect/.test(process.execArgv.join(' '))
  if (v8InspectorEnabled) await debugContextRegister()
}
