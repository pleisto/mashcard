import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule, Params } from 'nestjs-pino'
import { configOptions } from './config'
import { KMSModule } from './kms/kms.module'
import { RedisModule } from './redis/redis.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get<Params>('logger')!
    }),
    ConfigModule.forRoot(configOptions),
    KMSModule,
    RedisModule,
    PrismaModule
  ]
})
export class CommonModule {}
