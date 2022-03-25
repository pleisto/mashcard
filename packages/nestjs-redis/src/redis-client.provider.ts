import { createClient as createRedisClient } from 'redis'
import { Provider, Scope } from '@nestjs/common'
import {
  REDIS_CLIENT,
  RedisClientType,
  REDIS_MODULE_OPTIONS,
  RedisModuleOptions,
  RedisModuleAsyncOptions
} from './redis.interface'

/**
 * Create a Redis Client Provider
 * @returns
 */
export const createClient = (): Provider => ({
  provide: REDIS_CLIENT,
  useFactory: async (options: RedisModuleOptions): Promise<RedisClientType> => {
    const client = createRedisClient(options) as RedisClientType
    if (!client.isOpen) await client.connect()
    return client
  },
  inject: [REDIS_MODULE_OPTIONS],
  scope: Scope.DEFAULT
})

export const createAsyncClientOptions = (options: RedisModuleAsyncOptions): Provider => ({
  provide: REDIS_MODULE_OPTIONS,
  useFactory: options.useFactory,
  inject: options.inject
})
