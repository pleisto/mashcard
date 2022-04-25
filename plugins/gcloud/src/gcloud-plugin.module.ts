import { DynamicModule, Module } from '@nestjs/common'
@Module({})
export class GcloudPluginModule {
  static forRoot(): DynamicModule {
    return {
      module: GcloudPluginModule,
      imports: []
    }
  }
}
