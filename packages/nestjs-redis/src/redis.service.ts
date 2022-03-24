import { Injectable, Inject } from '@nestjs/common'
import {
  REDIS_CLIENT,
  RedisClientType,
  RedisCommandOptions,
  RedisModuleOptions,
  CryptoService
} from './redis.interface'
import type { transformArguments } from '@node-redis/client/dist/lib/commands/SET'

type SetOptions = Parameters<typeof transformArguments>[2]

@Injectable()
export class RedisService {
  static defaultOptions: RedisCommandOptions = {
    hashedKey: false,
    encrypted: false
  }

  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: RedisClientType) {
    // Inject cryptoService if provided by options
    const options = this.redisClient.options as RedisModuleOptions
    if (options.cryptoService) this.cryptoService = options.cryptoService
  }

  protected cryptoService: CryptoService | undefined

  /**
   * Extract namespace from key
   * @param key
   * @returns namespace and key
   */
  static extractKey(key: string): { namespace: string | undefined; key: string } {
    const keyArray = key.split(':')
    const namespace = keyArray.slice(0, -1).join(':')
    return {
      namespace, // part of key before last ':'
      key: keyArray.at(-1)! // last part of key
    }
  }

  /**
   * Get node-redis client instance
   * @see https://redis.js.org/
   */
  get client(): RedisClientType {
    return this.redisClient
  }

  /**
   * Set value to redis
   * @param key Key
   * @param value Value.
   * @param options RedisCommandOptions
   * @returns Promise<boolean>
   */
  public async set(key: string, value: string, options?: RedisCommandOptions): Promise<string | null>
  public async set<T>(key: string, value: T, options?: RedisCommandOptions): Promise<string | null>
  public async set<T>(
    key: string,
    value: T,
    options: RedisCommandOptions = RedisService.defaultOptions
  ): Promise<string | null> {
    // @see https://redis.io/commands/set#options
    const setOptions: SetOptions = {}
    options?.ttl && (setOptions.EX = options.ttl)
    options?.ttlTimestamp && (setOptions.PX = options.ttlTimestamp)
    options?.onlyNotExists && (setOptions.NX = options.onlyNotExists)
    options?.onlyExists && (setOptions.XX = options.onlyExists)
    options?.keepTTL && (setOptions.KEEPTTL = options.keepTTL)
    options?.getSet && (setOptions.GET = options.getSet)

    let encodedValue = JSON.stringify(value)
    // Use Redis key as a context to generate encrypt sub-key
    options?.encrypted && this.cryptoService && (encodedValue = this.cryptoService.symmetricEncrypt(encodedValue, key))

    return await this.redisClient.set(
      this.redisKey(key, options), // key
      encodedValue, // value
      setOptions // options
    )
  }

  /**
   * Get value from redis
   * @param key Key
   * @param options RedisCommandOptions
   * @returns Promise<string>
   */
  public async get(key: string, options?: RedisCommandOptions): Promise<string | null>
  public async get<T>(key: string, options?: RedisCommandOptions): Promise<T | null>
  public async get<T>(key: string, options: RedisCommandOptions = RedisService.defaultOptions): Promise<T | null> {
    const result = await this.redisClient.get(this.redisKey(key, options))
    if (!result) return null
    try {
      // Use Redis key as a context to generate encrypt sub-key
      const rawValue =
        options.encrypted && this.cryptoService ? this.cryptoService.symmetricDecrypt(result, key) : result
      return JSON.parse(rawValue)
    } catch (_e) {
      return null
    }
  }

  /**
   * Delete by key
   * @param key redis key
   * @returns delete result
   */
  public async del(key: string, options: RedisCommandOptions = RedisService.defaultOptions): Promise<boolean> {
    return (await this.redisClient.del(this.redisKey(key, options))) > 0
  }

  /**
   * Ping redis
   * @returns string - 'PONG'
   */
  public async ping(): Promise<string> {
    return await this.redisClient.ping()
  }

  /**
   * Encode Redis key
   * @param key redis key
   * @returns masked key
   */
  protected redisKey(key: string, options: RedisCommandOptions): string {
    if (!options.hashedKey || this.cryptoService === undefined) return key

    const k = RedisService.extractKey(key)
    return k.namespace
      ? `${k.namespace}:${this.cryptoService.dataMasking(k.key)}`
      : this.cryptoService.dataMasking(k.key)
  }
}
