import { deriveKey } from '@brickdoc/cypherpunk'
import { ConfigService } from '@nestjs/config'
import { SecretSubKey } from '../kms.interface'
import { memoize } from '@brickdoc/active-support'

export abstract class SeedDecoder {
  constructor(private readonly configService: ConfigService) {}

  /**
   * get Root Secret Key from seed
   * @param seed - seed string
   * @returns Root Secret Key
   */
  get rootSecret(): string {
    const appEnv = this.configService.get<string>('application.env')!
    return memoize(deriveKey)(this.seed, SecretSubKey.ROOT_KEY, appEnv)
  }

  /**
   * Get Raw Secret Key Seed from Configurations
   */
  get rawSeed(): string {
    return this.configService.get<string>('security.secretKey.seed')!
  }

  abstract get seed(): string
}
