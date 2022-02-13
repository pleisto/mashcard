import { ConfigModuleOptions } from '@nestjs/config'
import { database } from './database'
import { logger } from './logger'
import { security } from './security'
import { application } from './application'
import { envFilePath } from '@brickdoc/dotenv'

console.log(999, envFilePath, process.cwd())

/**
 * Options for `ConfigModule.forRoot`
 */
export const configOptions: ConfigModuleOptions = {
  envFilePath,
  load: [security, database, logger, application],
  cache: true,
  // Declare it as a global module.
  isGlobal: true
}
