import { Provider } from '@nestjs/common'
import { PlainSeedDecoder } from './plain.decoder'
import { SeedDecoder } from './base.decoder'
import { ConfigService } from '@nestjs/config'

export const SeedDecoderProvider: Provider = {
  provide: SeedDecoder,
  useFactory: (config: ConfigService) => {
    const decoder = config.get('security.secretKey.seedDecoder')
    switch (decoder) {
      case 'plain':
        return new PlainSeedDecoder(config)
      default:
        throw new Error(`Unimplemented SecretSeedDecoder: ${decoder}`)
    }
  },
  inject: [ConfigService]
}
