import { createClient } from 'redis'
import { Provider, Scope } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { REDIS_CLIENT, RedisOptionsType, RedisClientType } from './redis.interface'

/**
 * Create a Redis Client Provider
 * @returns
 */
export const RedisClientProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: async (config: ConfigService): Promise<RedisClientType> => {
    const client = createClient(config.get<RedisOptionsType>('database.redis')) as RedisClientType
    if (!client.isOpen) await client.connect()
    return client
  },
  inject: [ConfigService],
  scope: Scope.DEFAULT
}
