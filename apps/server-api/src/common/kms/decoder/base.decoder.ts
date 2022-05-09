import { env } from 'process'
import { Buffer } from 'buffer'
import { deriveKey } from '@brickdoc/server-api-crate'
import { SecretSubKey } from '../kms.interface'

/**
 * Abstract SeedDecoder class
 */
export abstract class SeedDecoder {
  /**
   * get Root Secret Key from seed
   * @param seed - seed string
   * @returns Root Secret Key
   */
  async rootSecret(rawSeed: Buffer): Promise<string> {
    return deriveKey(await this.seed(rawSeed), SecretSubKey.ROOT_KEY, env.NODE_ENV)
  }

  /**
   * Decode seed from binary
   */
  abstract seed(rawSeed: Buffer): Promise<string>
}
