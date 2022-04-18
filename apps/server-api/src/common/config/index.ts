import { ConfigModuleOptions } from '@nestjs/config'
import { application } from './application'
/**
 * Options for `ConfigModule.forRoot`
 */
export const configOptions: ConfigModuleOptions = {
  ignoreEnvFile: true,
  load: [application],
  cache: true,
  // Declare it as a global module.
  isGlobal: true
}
