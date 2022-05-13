import { Provider, Scope } from '@nestjs/common'
import { Buffer } from 'buffer'
import { BrickdocBaseError } from '../../errors'
import { HooksExplorer, HookType } from '../../server-plugin'
import { PlainSeedDecoder } from './plain.seed-decoder'
import { BaseSeedDecoder } from './base.seed-decoder'
import { KMS_MODULE_OPTIONS, KMSModuleOptions, KMS_ROOT_SECRET_KEY } from '../kms.interface'

/**
 * Create a SeedDecoder Provider
 * @returns
 */
export const createSeedDecoder = (): Provider => ({
  provide: KMS_ROOT_SECRET_KEY,
  useFactory: async (options: KMSModuleOptions, explorer: HooksExplorer) => {
    const [decoderName, rawVal] = options.seed.split(':')

    // find extra decoder adapter from server plugin hooks
    const extraDecoders = explorer.findByType(HookType.COMMON_KMS_SEED_DECODER)

    const decoder = decoderResolver(decoderName, extraDecoders)
    return await decoder.rootSecret(Buffer.from(rawVal, 'base64'))
  },
  inject: [KMS_MODULE_OPTIONS, HooksExplorer],
  scope: Scope.DEFAULT
})

/**
 * Resolve SeedDecoder
 * @param decoderName decoder name
 * @param extraDecoders Extra SeedDecoder that injected by server plugin
 * @returns
 */
const decoderResolver = (decoderName: string, extraDecoders?: BaseSeedDecoder[]): BaseSeedDecoder => {
  if (decoderName === 'PlainSeedDecoder') return new PlainSeedDecoder()
  const decoder = extraDecoders?.find(d => d.constructor.name === decoderName)
  if (!decoder) throw new BrickdocBaseError('apiSrv.kms.UNKNOWN_SEED_DECODER', `KMS decoder ${decoder} not found`)
  return decoder
}
