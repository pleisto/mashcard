import { DynamicModule, Module } from '@nestjs/common'
import { RedisCoreModule } from './redis-core.module'
import { RedisModuleOptions, RedisModuleAsyncOptions } from './redis.interface'
@Module({})
export class RedisModule {
  static forRoot(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRoot(options)]
    }
  }

  static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRootAsync(options)]
    }
  }
}
