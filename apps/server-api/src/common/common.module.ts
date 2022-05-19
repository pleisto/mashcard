import { env } from 'process'
import { Module } from '@nestjs/common'
import { RedisModule } from '@brickdoc/nestjs-redis'
import { SlonikModule } from '@brickdoc/nestjs-slonik'
import { KMSModule, KMSService } from './kms'
import { SettingsModule } from './settings'
import { ServerPluginModule } from './server-plugin'
import { BlobsModule } from './blobs/blobs.module'
import { ScalarsModule } from './scalars/scalars.module'
import { IS_TEST_MODE } from './utils'

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
      verboseRetryLog: true,
      clientConfigurationInput:
        /**
         * https://github.com/gajus/slonik/issues/63
         * avoid jest open handle error
         */
        IS_TEST_MODE
          ? {
              idleTimeout: 'DISABLE_TIMEOUT',
              maximumPoolSize: 1
            }
          : undefined
    }),
    SettingsModule.forRoot(),
    ServerPluginModule,
    BlobsModule,
    ScalarsModule
  ]
})
export class CommonModule {}
