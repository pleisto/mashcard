import { Injectable, Inject } from '@nestjs/common'
import { SeedDecoder } from './decoder/base.decoder'
import { SecretSubKey } from './kms.interface'
import { deriveKey, genericHash, aeadDecrypt, aeadEncrypt } from '@brickdoc/cypherpunk'
import { memoize } from '@brickdoc/active-support'

@Injectable()
export class KMSService {
  constructor(@Inject(SeedDecoder) private readonly seedDecoder: SeedDecoder) {}

  get rootSecret(): string {
    return this.seedDecoder.rootSecret
  }

  /**
   * Get a new sub key
   * @param subKeyType the type of sub key to generate
   * @param context It don't have to be secret and can have a low entropy
   * @returns
   */
  public subKey(subKeyType: SecretSubKey, context?: string): string {
    return deriveKey(this.rootSecret, subKeyType, context)
  }

  /**
   * Data masking
   * @param data The data to mask
   * @param length The length of the hash
   * @returns The hashed data string
   */
  public dataMasking(data: string, length = 32): string {
    // memoize data masking salt
    const salt = memoize(deriveKey)(this.rootSecret, SecretSubKey.HASH_SALT, 'data masking')
    return genericHash(data, salt, length)
  }

  /**
   * Symmetric-key encryption
   * @param data
   * @param context
   * @returns
   */
  public symmetricEncrypt(data: string, context: string): string {
    return aeadEncrypt(data, this.symmetricKey(context))
  }

  /**
   * Symmetric-key decryption
   * @param data
   * @param context
   * @returns
   */
  public symmetricDecrypt(data: string, context: string): string {
    return aeadDecrypt(data, this.symmetricKey(context))
  }

  /**
   * Get a symmetric key
   * @param context
   * @returns
   */
  private symmetricKey(context: string): string {
    return deriveKey(this.rootSecret, SecretSubKey.DATA_ENCRYPTION, context)
  }
}
