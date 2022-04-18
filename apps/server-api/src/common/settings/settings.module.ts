import { DynamicModule, Module, Global } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'
import { ConfigMapExplorer } from './config-map.explorer'
import { ConfigMapMetadataAccessor } from './config-map-metadata.accessor'
import { SettingsService } from './settings.service'

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
