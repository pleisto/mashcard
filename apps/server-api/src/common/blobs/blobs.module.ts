import { DynamicModule, Module, Global } from '@nestjs/common'

@Global()
@Module({
  providers: [],
  imports: [],
  exports: []
})
export class BlobsModule {
  static forRoot(): DynamicModule {
    return {
      module: BlobsModule
    }
  }
}
