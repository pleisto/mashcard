import { DiscoveryModule } from '@nestjs/core'
import { Module, Global } from '@nestjs/common'
import { ServerPluginLoader } from './server-plugin-loader.module'
import { HooksExplorer } from './hooks.explorer'
import { HookMetadataAccessor } from './hook-metadata.accessor'

/**
 * ServerPluginModule is a plug-in architecture for NestJS server.
 * It allows dynamic importing of nestjs modules as a server plugin.
 * And, it also provide hooks decorator to allow server plugins to hook into the some adapter or lifecycle events.
 */
@Global()
@Module({
  imports: [DiscoveryModule, ServerPluginLoader.forRootAsync()],
  providers: [HooksExplorer, HookMetadataAccessor],
  exports: [HooksExplorer]
})
export class ServerPluginModule {}
