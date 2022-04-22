import { Provider, Scope } from '@nestjs/common'
import { Buffer } from 'buffer'
import { BrickdocBaseError } from '../../errors'
import { PlainSeedDecoder } from './plain.decoder'
import { SeedDecoder } from './base.decoder'
import { KMS_MODULE_OPTIONS, KMSModuleOptions } from '../kms.interface'

/**
 * Create a SeedDecoder Provider
 * @returns
 */
export const createSeedDecoder = (): Provider => ({
  provide: SeedDecoder,
  useFactory: (options: KMSModuleOptions) => {
    const [decoderName, rawVal] = options.seed.split(':')
    return decoderResolver(decoderName, Buffer.from(rawVal, 'base64'))
  },
  inject: [KMS_MODULE_OPTIONS],
  scope: Scope.DEFAULT
})

/**
 * Resolve SeedDecoder
 * @param decoder decoder name
 * @returns
 */
const decoderResolver = (decoder: string, rawSeed: Buffer): SeedDecoder => {
  switch (decoder) {
    case 'plain':
      return new PlainSeedDecoder(rawSeed)
    default:
      throw new BrickdocBaseError('apiSrv.kms.UNKNOWN_SEED_DECODER', `Unknown seed decoder \`${decoder}\``)
  }
}
