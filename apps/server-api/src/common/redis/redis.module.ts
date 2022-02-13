import { Module, OnModuleDestroy, Inject, Global } from '@nestjs/common'
import { RedisService } from './redis.service'
import { REDIS_CLIENT, RedisClientType } from './redis.interface'
import { RedisClientProvider } from './redisClient.provider'

/**
 * Module that provides a Redis Instance
 */
@Global()
@Module({
  providers: [RedisClientProvider, RedisService],
  exports: [RedisService]
})
export class RedisModule implements OnModuleDestroy {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redisClient: RedisClientType
  ) {}

  /**
   * Disconnect redis client on module destroy
   */
  async onModuleDestroy(): Promise<void> {
    if (this.redisClient.isOpen) await this.redisClient.quit()
  }
}
