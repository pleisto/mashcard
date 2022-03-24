import { DynamicModule, Module, OnModuleDestroy, Inject, Global } from '@nestjs/common'
import { RedisService } from './redis.service'
import {
  REDIS_CLIENT,
  RedisClientType,
  RedisModuleOptions,
  RedisModuleAsyncOptions,
  REDIS_MODULE_OPTIONS
} from './redis.interface'
import { createClient, createAsyncClientOptions } from './redis-client.provider'

/**
 * Module that provides a Redis Instance
 */
@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule implements OnModuleDestroy {
  constructor(
    @Inject(REDIS_MODULE_OPTIONS)
    private readonly options: RedisModuleOptions,
    @Inject(REDIS_CLIENT)
    private readonly redisClient: RedisClientType
  ) {}

  static forRoot(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [createClient(), { provide: REDIS_MODULE_OPTIONS, useValue: options }],
      exports: [RedisService]
    }
  }

  static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: options.imports,
      providers: [createClient(), createAsyncClientOptions(options)],
      exports: [RedisService]
    }
  }

  /**
   * Disconnect redis client on module destroy
   */
  async onModuleDestroy(): Promise<void> {
    if (this.redisClient.isOpen) await this.redisClient.quit()
  }
}
