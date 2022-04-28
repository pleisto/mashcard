import { DynamicModule, Module } from '@nestjs/common'
import { env } from 'process'
import { serverPluginModules } from './server-plugin.utils'

@Module({})
export class ServerPluginLoader {
  /**
   * Dynamic module that import all enabled plugins
   */
  static async forRootAsync(): Promise<DynamicModule> {
    const pluginIds = env.ENABLED_SERVER_PLUGINS?.split(',') ?? []
    return {
      module: ServerPluginLoader,
      imports: [...(await serverPluginModules(pluginIds))]
    }
  }
}
