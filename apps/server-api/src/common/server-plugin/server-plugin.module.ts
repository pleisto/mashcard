import { DiscoveryModule } from '@nestjs/core'
import { Module, Global } from '@nestjs/common'
import { ServerPluginLoader } from './server-plugin-loader.module'
import { HooksExplorer } from './hooks.explorer'
import { HookMetadataAccessor } from './hook-metadata.accessor'

@Global()
@Module({
  imports: [DiscoveryModule, ServerPluginLoader.forRootAsync()],
  providers: [HooksExplorer, HookMetadataAccessor],
  exports: [HooksExplorer]
})
export class ServerPluginModule {}
