import { env } from 'process'
import { Buffer } from 'buffer'
import { deriveKey } from '@brickdoc/cypherpunk'
import { SecretSubKey } from '../kms.interface'
import { memoize } from '@brickdoc/active-support'

export abstract class SeedDecoder {
  constructor(protected readonly rawSeed: Buffer) {}

  /**
   * get Root Secret Key from seed
   * @param seed - seed string
   * @returns Root Secret Key
   */
  get rootSecret(): string {
    return memoize(deriveKey)(this.seed, SecretSubKey.ROOT_KEY, env.NODE_ENV)
  }

  /**
   * get decoded seed string
   */
  abstract get seed(): string
}
