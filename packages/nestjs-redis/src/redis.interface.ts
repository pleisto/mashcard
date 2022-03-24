import { ModuleMetadata } from '@nestjs/common/interfaces'
import { RedisClientOptions, RedisClientType } from '@node-redis/client/dist/lib/client'

export type { RedisClientType }

export const REDIS_MODULE_OPTIONS = Symbol('REDIS_MODULE_OPTIONS')
export const REDIS_CLIENT = Symbol('REDIS_CLIENT')

export interface CryptoService {
  symmetricEncrypt: (data: string, key: string) => string
  symmetricDecrypt: (data: string, key: string) => string
  dataMasking: (data: string) => string
}

export interface RedisModuleOptions extends RedisClientOptions<never, Record<string, never>> {
  /**
   * Crypto service to use for encrypting and decrypting data.
   * If not provided, data will be stored in plain text.
   */
  cryptoService?: CryptoService
}

export interface RedisModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<RedisModuleOptions> | RedisModuleOptions
  inject?: any[]
}

export interface RedisCommandOptions {
  /**
   * Data masking by Hash algorithm for `key`.
   * Excluding the namespaces prefix.
   *
   * Applies to **all** methods.
   * @defaultValue false
   */
  hashedKey: boolean

  /**
   * Auto encrypt/decrypt `key` and `value` by symmetric-key algorithm.
   * `ENV.SECRET_KEY_BASE` will be used as cipher key.
   * Excluding the namespaces prefix for `key`.
   *
   * Applies to **all** methods.
   * @defaultValue false
   */
  encrypted: boolean

  /**
   * Set the specified expire time, **in milliseconds**. Equals to Redis `PX` option.
   *
   * Applies to `set` method.
   */
  ttl?: number
  /**
   * Set the specified Unix time at which the key will expire, **in milliseconds**.
   * Equals to Redis `PXAT` option.
   *
   * Applies to `set` method.
   */
  ttlTimestamp?: number
  /**
   * Only set the key if it does not already exist. Equals to Redis `NX` option.
   *
   * Applies to `set` method.
   */
  onlyNotExists?: boolean
  /**
   * Only set the key if it already exists. Equals to Redis `XX` option.
   *
   * Applies to `set` method.
   */
  onlyExists?: boolean
  /**
   * Keep the key's TTL (time to live). Equals to Redis `KEEPTTL` option.
   *
   * Applies to `set` method.
   */
  keepTTL?: boolean
  /**
   * Return the old string stored at key, or nil if key did not exist.
   * An error is returned and SET aborted if the value stored at key is not a string.
   * Equals to Redis `GETSET` option.
   *
   * Applies to `set` method.
   */
  getSet?: boolean
}
