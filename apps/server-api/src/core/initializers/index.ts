import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { SettingsService } from '../../common/settings'
import { HooksExplorer, HookType } from '../../common/server-plugin'
import { KMSService } from '../../common/kms/kms.service'
import { SecretSubKey } from '../../common/kms/kms.interface'
import { loggerRegister } from './logger.register'
import { requestIDRegister } from './request-id.register'
import { helmetRegister } from './helmet.register'
import { cookieRegister } from './cookie.register'
import { sessionRegister } from './session.register'
import { debugContextRegister } from './debugger.register'
import { viewEngineRegister } from './view-engine.register'
import { initCheckRegister } from './init-check.register'

/**
 * loadInitializers will be called by `/main.ts` when the application is bootstrapped and listening for connections.
 */
export const loadInitializers = async (app: NestFastifyApplication): Promise<void> => {
  await initCheckRegister(app)

  // Get Injection Service
  const kmsService = app.get(KMSService)
  const settingsService = app.get(SettingsService)
  const initializerHooks = app.get(HooksExplorer).findByType(HookType.CORE_INITIALIZER)

  // Helmet must be registered in the first place to make it apply to every route defined later.
  await helmetRegister(app)

  // common initializers
  app.enableShutdownHooks()
  await requestIDRegister(app)
  loggerRegister(app)
  cookieRegister(app, kmsService.subKey(SecretSubKey.SECURE_COOKIE, 'signature'))
  const tlsEnabled = await settingsService.get<boolean>('core.tlsEnabled')
  sessionRegister(app, kmsService.subKey(SecretSubKey.SECURE_COOKIE, 'session'), tlsEnabled)
  viewEngineRegister(app)

  // Inject context to `globalThis.ctx` when Nodejs Debugger is enabled
  const v8InspectorEnabled =
    typeof (globalThis as any).v8debug === 'object' || /--debug|--inspect/.test(process.execArgv.join(' '))
  if (v8InspectorEnabled) await debugContextRegister(app)

  // hooks initializers
  initializerHooks.forEach(async hook => {
    await hook.forHookAsync(settingsService)
  })
}
