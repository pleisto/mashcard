import { DynamicModule, Module } from '@nestjs/common'
import { SentryConfigMap } from './sentry-plugin.config-map'
import { SentryInitializerHook } from './sentry.initializer.hook'
@Module({})
export class SentryPluginModule {
  static forRoot(): DynamicModule {
    return {
      module: SentryPluginModule,
      providers: [SentryConfigMap, SentryInitializerHook]
    }
  }
}
