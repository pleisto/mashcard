import { Test } from '@nestjs/testing'
import { RedisService } from '../redis.service'
import { REDIS_CLIENT } from '../redis.interface'

/**
 * node-redis client mock
 */
class RedisMockClient {
  private dataStore: { [key: string]: string } = {}
  get options() {
    return {
      cryptoService: {
        symmetricEncrypt: (value: string, key: string) => `${value}_encrypted`,
        symmetricDecrypt: (value: string, key: string) => value.replace('_encrypted', ''),
        dataMasking: (value: string) => `${value}_masked`
      }
    }
  }

  async set(key: string, value: string) {
    this.dataStore[key] = value
    return true
  }

  async get(key: string) {
    return this.dataStore[key] || false
  }

  async del(key: string) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.dataStore[key]
    return true
  }

  async ping() {
    return 'PONG'
  }
}

describe('RedisService', () => {
  let redis: RedisService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: REDIS_CLIENT,
          useFactory: () => new RedisMockClient()
        },
        RedisService
      ]
    }).compile()
    redis = moduleRef.get<RedisService>(RedisService)
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

  it('could ping redis and directly use redis client', async () => {
    expect(await redis.ping()).toBe('PONG')
    expect(await redis.client.ping()).toBe('PONG')
  })

  it('.extractKey should work', () => {
    expect(RedisService.extractKey('foo')).toEqual({ key: 'foo', namespace: '' })
    expect(RedisService.extractKey('foo:bar')).toEqual({ key: 'bar', namespace: 'foo' })
    expect(RedisService.extractKey('foo:bar:baz:qux')).toEqual({ key: 'qux', namespace: 'foo:bar:baz' })
  })
})
