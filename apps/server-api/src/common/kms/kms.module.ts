import { Module, Global, DynamicModule, Inject } from '@nestjs/common'
import { createSeedDecoder } from './decoder/decoder.provider'
import { KMSModuleOptions, KMS_MODULE_OPTIONS } from './kms.interface'
import { KMSService } from './kms.service'

@Global()
@Module({
  providers: [KMSService],
  exports: [KMSService]
})
/**
 * KMS Module that provides data masking, encryption and decryption services based on key derivation functions.
 */
export class KMSModule {
  constructor(
    @Inject(KMS_MODULE_OPTIONS)
    private readonly options: KMSModuleOptions
  ) {}

  static forRoot(options: KMSModuleOptions): DynamicModule {
    return {
      module: KMSModule,
      providers: [
        createSeedDecoder(),
        {
          provide: KMS_MODULE_OPTIONS,
          useValue: options
        }
      ],
      exports: [KMSService]
    }
  }
}
