import { env } from 'process'
import { Module } from '@nestjs/common'
import { RedisModule } from '@brickdoc/nestjs-redis'
import { SlonikModule } from '@brickdoc/nestjs-slonik'
import { KMSModule, KMSService } from './kms'
import { SettingsModule } from './settings'

/**
 * All Modules in the Common Module are global modules.
 */
@Module({
  imports: [
    KMSModule.forRoot({ seed: env.SECRET_KEY_SEED! }),
    RedisModule.forRootAsync({
      inject: [KMSService],
      useFactory: (kms: KMSService) => ({
        url: env.REDIS_URL!,
        cryptoService: kms
      })
    }),
    SlonikModule.forRoot({
      connectionUri: `${env.DATABASE_URL_BASE}/${env.DATABASE_NAME}`,
      verboseRetryLog: true
    }),
    SettingsModule.forRoot()
  ]
})
export class CommonModule {}
