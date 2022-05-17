import { Test, TestingModule } from '@nestjs/testing'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { loadInitializers } from '../../core/initializers'
import { AppModule } from '../../app.module'
import { Logger } from '@nestjs/common'

const log = new Logger('APIServerTesting')
export type CallBack = (app: NestFastifyApplication, moduleRef: TestingModule) => Promise<void>

/**
 * Create app module for testing
 *
 * @returns {Promise<NestFastifyApplication>}
 */
export const useAppInstance = async (
  beforeAllCallback?: CallBack,
  afterAllCallback?: CallBack
): Promise<() => NestFastifyApplication> => {
  let app: NestFastifyApplication
  let moduleRef: TestingModule

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = moduleRef.createNestApplication(new FastifyAdapter())
    await app.init()
    await loadInitializers(app, log)
    await beforeAllCallback?.(app, moduleRef)
  })

  afterAll(async () => {
    await app?.close()
    await afterAllCallback?.(app, moduleRef)
  })

  return () => app
}

/**
 * Create http server based on app module for testing
 */
export const useAppInstanceWithHttp = async (
  beforeAllCallback?: CallBack,
  afterAllCallback?: CallBack
): Promise<() => NestFastifyApplication> => {
  const instance = await useAppInstance(async (app, moduleRef) => {
    await app.getHttpAdapter().getInstance().ready()
    await beforeAllCallback?.(app, moduleRef)
  }, afterAllCallback)
  return () => instance()
}
