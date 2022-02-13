import { Module, Global } from '@nestjs/common'
import { SeedDecoderProvider } from './seedDecoder/provider'
import { KMSService } from './kms.service'

@Global()
@Module({
  providers: [SeedDecoderProvider, KMSService],
  exports: [KMSService]
})
export class KMSModule {}
