import { Test } from '@nestjs/testing'
import { RedisService } from '../redis.service'
import { CommonModule } from '../../common.module'

// Todo: add redis to jest and fix OpenHandles error
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('RedisService', () => {
  let redis: RedisService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CommonModule]
    }).compile()
    redis = moduleRef.get(RedisService)
  })

  afterAll(async () => {
    // NestJS doesn't call lifecycle hooks when tests, so we need to manually
    await redis.client.quit()
  })

  it('hashedKey and encrypted should be work', async () => {
    const key = `jest:redisService:hashedKey${Date.now()}`
    const value = { foo: 'bar' }
    const opts = { hashedKey: true, encrypted: true }
    await redis.set(key, value, opts)
    expect(await redis.get(key)).toBeFalsy()
    expect(await redis.get(key, opts)).toEqual(value)
    expect(await redis.del(key, opts)).toBeTruthy()
  })
})
