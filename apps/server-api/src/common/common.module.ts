import { env } from 'process'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RedisModule } from '@brickdoc/nestjs-redis'
import { SlonikModule } from '@brickdoc/nestjs-slonik'
import { configOptions } from './config'
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
    ConfigModule.forRoot(configOptions),
    SettingsModule.forRoot()
  ]
})
export class CommonModule {
  /**
   * Called once the host module's dependencies have been resolved.
   */
  public async onModuleInit(): Promise<void> {
    // Check required environment variables are set
    const missedEnvVars = ['NODE_ENV', 'REDIS_URL', 'SECRET_KEY_SEED', 'DATABASE_URL_BASE', 'DATABASE_NAME'].filter(
      // eslint-disable-next-line no-prototype-builtins
      key => !env.hasOwnProperty(key)
    )
    if (missedEnvVars.length > 0) throw new Error(`Missing environment variables: ${missedEnvVars.join(', ')}`)
  }
}
