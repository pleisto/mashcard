import { TestingModule } from '@nestjs/testing'
import { env } from 'process'
import { SettingsService } from '../settings.service'
import { useAppInstance } from '../../testing'

describe('SettingService', () => {
  let settings: SettingsService

  const createInstance = useAppInstance(async (_app: unknown, moduleRef: TestingModule) => {
    settings = moduleRef.get<SettingsService>(SettingsService)
  })

  beforeAll(async () => {
    ;(await createInstance)()
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
    const userId = 'testing_user_foo'
    const spaceId = 'testing_space_bar'

    const defaultTz = (await settings.get<string>(key))._unsafeUnwrap()
    await settings.update(key, sgTz, { userId })
    await settings.update(key, eeTz, { userId, spaceId })
    await settings.update(key, pstTZ, { spaceId })
    expect((await settings.get<string>(key, { userId, spaceId }))._unsafeUnwrap()).toEqual(eeTz)
    expect((await settings.get<string>(key, { userId, spaceId: 'nil' }))._unsafeUnwrap()).toEqual(sgTz)
    expect((await settings.get<string>(key, { spaceId, userId: 'nil' }))._unsafeUnwrap()).toEqual(pstTZ)
    expect((await settings.get<string>(key, { spaceId: 'nil', userId: 'nil' }))._unsafeUnwrap()).toEqual(defaultTz)
  })
})
