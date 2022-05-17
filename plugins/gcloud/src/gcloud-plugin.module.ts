import { DynamicModule, Module } from '@nestjs/common'
import { GcloudConfigMap } from './gcloud-plugin.config-map'
import { CloudProfilerInitializerHook } from './cloud-profiler.initializer.hook'
import { CloudKMSSeedDecoderHook } from './cloud-kms.seed-decoder.hook'
@Module({})
export class GcloudPluginModule {
  static forRoot(): DynamicModule {
    return {
      module: GcloudPluginModule,
      providers: [GcloudConfigMap, CloudProfilerInitializerHook, CloudKMSSeedDecoderHook]
    }
  }
}
