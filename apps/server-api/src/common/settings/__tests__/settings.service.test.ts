import { Test, TestingModule } from '@nestjs/testing'
import { env } from 'process'
import { AppModule } from '../../../app.module'
import { SettingsService } from '../settings.service'

describe('SettingService', () => {
  let settings: SettingsService
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    settings = module.get<SettingsService>(SettingsService)
  })

  afterAll(async () => {
    await module?.close()
  })

  it('should get local setting', async () => {
    expect((await settings.get<string>('core.appEnv'))._unsafeUnwrap()).toEqual(env.NODE_ENV)
  })

  it('should get all exposed configs', async () => {
    expect((await settings.allExposedItems())._unsafeUnwrap().map(i => i.key)).toEqual(
      expect.arrayContaining(['core.defaultLanguage', 'core.appEnv', 'core.appUrl', 'core.defaultTimezone'])
    )
  })

  it('should cascade setting', async () => {
    const key = 'core.defaultTimezone'
    const sgTz = 'Asia/Singapore'
    const eeTz = 'Europe/Tallinn'
    const pstTZ = 'America/Los_Angeles'
    const userId = 'testing_user1'
    const workspaceId = 'testing_workspace1'

    const defaultTz = (await settings.get<string>(key))._unsafeUnwrap()
    await settings.update(key, sgTz, { userId })
    await settings.update(key, eeTz, { userId, workspaceId })
    await settings.update(key, pstTZ, { workspaceId })
    expect((await settings.get<string>(key, { userId, workspaceId }))._unsafeUnwrap()).toEqual(eeTz)
    expect((await settings.get<string>(key, { userId, workspaceId: 'nil' }))._unsafeUnwrap()).toEqual(sgTz)
    expect((await settings.get<string>(key, { workspaceId, userId: 'nil' }))._unsafeUnwrap()).toEqual(pstTZ)
    expect((await settings.get<string>(key, { workspaceId: 'nil', userId: 'nil' }))._unsafeUnwrap()).toEqual(defaultTz)
  })
})
