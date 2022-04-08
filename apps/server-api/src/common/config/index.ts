import { ConfigModuleOptions } from '@nestjs/config'
import { database } from './database'
import { logger } from './logger'
import { security } from './security'
import { application } from './application'
/**
 * Options for `ConfigModule.forRoot`
 */
export const configOptions: ConfigModuleOptions = {
  ignoreEnvFile: true,
  load: [security, database, logger, application],
  cache: true,
  // Declare it as a global module.
  isGlobal: true
}
