import { Logger } from '@nestjs/common'
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
import { uncaughtHandlerRegister } from './uncaught-handler.register'
import { blobsRegister } from './blobs.register'

/**
 * loadInitializers will be called by `/main.ts` when the application is bootstrapped and listening for connections.
 */
export const loadInitializers = async (app: NestFastifyApplication, log: Logger): Promise<void> => {
  // Enables the usage of shutdown hooks. Will call the `onApplicationShutdown` function of a provider if the
  // process receives a shutdown signal.
  app.enableShutdownHooks()

  // Get Injection Service
  const kmsService = app.get(KMSService)
  const settingsService = app.get(SettingsService)
  const initializerHooks = app.get(HooksExplorer).findByType(HookType.CORE_INITIALIZER)
  const tlsEnabled = (await settingsService.get<boolean>('core.tlsEnabled')).unwrapOr(false)!

  // Helmet must be registered in the first place to make it apply to every route defined later.
  await helmetRegister(app, tlsEnabled)

  // common initializers
  await initCheckRegister(app)
  await requestIDRegister(app)
  loggerRegister(app)
  // cookieRegister should be registered before sessionRegister. because sessionRegister will
  // use cookieRegister to sign the session cookie
  cookieRegister(app, kmsService.subKey(SecretSubKey.SECURE_COOKIE, 'signature'))
  sessionRegister(app, kmsService.subKey(SecretSubKey.SECURE_COOKIE, 'session'), tlsEnabled)
  viewEngineRegister(app)
  blobsRegister(app)

  // Inject context to `globalThis.ctx` when Nodejs Debugger is enabled
  const v8InspectorEnabled =
    typeof (globalThis as any).v8debug === 'object' || /--debug|--inspect/.test(process.execArgv.join(' '))
  if (v8InspectorEnabled) await debugContextRegister(app)

  // hooks initializers
  initializerHooks.forEach(async hook => {
    await hook.forHookAsync(settingsService)
  })

  // uncaught exception handler must be registered after all initializers
  uncaughtHandlerRegister(app, log)
}
