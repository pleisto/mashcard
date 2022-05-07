import { DynamicModule, Module, Global } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'
import { ConfigMapExplorer } from './config-map.explorer'
import { ConfigMapMetadataAccessor } from './config-map-metadata.accessor'
import { SettingsService } from './settings.service'

/**
 * Settings is a common configuration service with scope to support multi-tenant or plugin based configurations.
 * It's can read and write configurations from environment variables or database.
 *
 * you could use @ConfigMap() decorator to distributed declare config map schema.
 * Then you can use SettingsService to read and write configurations.
 *
 * @example:
 * ```ts
 * @ConfigMap('core.logger')
 * export class LoggerConfigMap {
 *   @Item({
 *    // LOCAL_STATIC means that config value is use static value and don't support modification.
 *    // see ScopeLookupStrategy for more details.
 *    scope: ScopeLookupStrategy.LOCAL_STATIC,
 *    // could validate config value with yup schema.
 *    validation: yup.mixed().oneOf(['foo', 'bar']),
 *    // clientExposed means that config value is exposed to client.
 *    clientExposed: true
 *   })
 *   logger: string = env.LOGGER
 * }
 * ```
 */
@Global()
@Module({
  providers: [ConfigMapMetadataAccessor, ConfigMapExplorer, SettingsService],
  imports: [DiscoveryModule],
  exports: [SettingsService]
})
export class SettingsModule {
  static forRoot(): DynamicModule {
    return {
      module: SettingsModule
    }
  }
}
