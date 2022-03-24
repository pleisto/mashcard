import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule, Params } from 'nestjs-pino'
import { configOptions } from './config'
import { KMSModule } from './kms/kms.module'
import { RedisModule, RedisModuleOptions } from '@brickdoc/nestjs-redis'

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get<Params>('logger')!
    }),
    ConfigModule.forRoot(configOptions),
    KMSModule,
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get<RedisModuleOptions>('database.redis')!
    })
  ]
})
export class CommonModule {}
