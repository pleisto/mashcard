import { Injectable } from '@nestjs/common'
import LRU from 'lru-cache'
import { ValidationError } from 'yup'
import { Result, err, ok } from '@brickdoc/active-support'
import {
  NotFoundError,
  ChangeConflictError,
  ValueValidationError,
  UnSupportedScopeLookupStrategyError
} from './settings.errors'
import { ConfigMapExplorer } from './config-map.explorer'
import { SettingsItem, SCOPE_ROOT_NODE, ScopeLookupStrategy, ScopeContext } from './settings.interface'
import { InjectPool, type DatabasePool } from '@brickdoc/nestjs-slonik'
import { KMSService } from '../kms'
import { createOrUpdateSetting, findSetting, findSettings } from './settings.sql-builder'

@Injectable()
export class SettingsService {
  protected cache: LRU<string, unknown>
  protected configMap: Array<SettingsItem<any>>

  constructor(
    readonly explorer: ConfigMapExplorer,
    private readonly kms: KMSService,
    @InjectPool() private readonly pool: DatabasePool
  ) {
    // SettingsService is a singleton, so we can create a LRU cache here.
    this.cache = new LRU({ max: 1_000 })

    // load all the items from the config map
    this.configMap = this.explorer.all()
  }

  /**
   * Get a setting value
   * @param key
   * @param scope
   */
  async get<T = unknown>(key: string, context: ScopeContext = {}): Promise<Result<T | undefined, Error>> {
    const item = this.findItem<T>(key as string)
    if (!item) return ok(undefined)
    // LOCAL_STATIC items are not stored in the database
    if (item.options.scope === ScopeLookupStrategy.LOCAL_STATIC) return ok(item.defaultValue)

    const [scope, fallbackScope] = this.calculateScope(item.options.scope, context)
    // try to get the value from the cache first
    const cachedKeyWithScope = this.cachedKey(key as string, scope)
    const cachedValue = this.cache.get(this.cachedKey(key as string, scope))
    if (cachedValue) return ok(cachedValue as T)

    // query the database
    return (await findSetting<T>(this.pool, item.key, scope, fallbackScope)).andThen(data => {
      const decodedData =
        // if the data is encrypted, decrypt it
        (data && item.options.encrypted
          ? JSON.parse(this.kms.symmetricDecrypt(item.value as unknown as string, scope))
          : data) ||
        // fallback to the default value
        item.defaultValue
      this.cache.set(cachedKeyWithScope, decodedData)
      return ok(decodedData)
    })
  }

  /**
   * Update a setting value on the database
   * @param key
   * @param value
   * @param scope
   */
  async update<T = unknown>(key: string, value: T, context: ScopeContext = {}): Promise<Result<null, Error>> {
    const item = this.findItem<T>(key as string)
    if (!item) return err(new NotFoundError(key))

    if (item.options.scope === ScopeLookupStrategy.LOCAL_STATIC)
      return err(
        new ChangeConflictError({
          key,
          options: item.options,
          reason: 'ScopeLookupStrategy.LOCAL_STATIC'
        })
      )

    // validate the value
    try {
      item.options.validation?.validateSync(value)
    } catch (e) {
      if (e instanceof ValidationError) return err(new ValueValidationError(key, e))
    }

    const [scope] = this.calculateScope(item.options.scope, context)
    // encrypt value if needed
    const storedValue = item.options.encrypted ? this.kms.symmetricEncrypt(JSON.stringify(value), scope) : value
    const dbResult = await createOrUpdateSetting(this.pool, key as string, storedValue, scope)

    // if the update is successful, update the cache
    if (dbResult.isOk()) {
      if (item.options.scope === ScopeLookupStrategy.ROOT_ONLY) {
        // update the cache for the root scope
        this.cache.set(this.cachedKey(key as string, SCOPE_ROOT_NODE), value)
      } else {
        // cascade delete the cache
        this.batchDeleteCache(scope)
      }
      // clear the cache for all exposed items if this item is exposed
      if (item.options.clientExposed) this.cache.delete(this.allExportedItemsCachedKey(context))
    }

    return dbResult
  }

  /**
   * Get all setting items that are exposed to the client
   */
  async allExposedItems(context: ScopeContext = {}): Promise<Result<Array<SettingsItem<unknown>>, Error>> {
    // try to get the value from the cache first
    const cachedKey = this.allExportedItemsCachedKey(context)
    const cachedValue = this.cache.get(cachedKey)
    if (cachedValue) return ok(cachedValue as Array<SettingsItem<unknown>>)
    const items = this.configMap.filter(i => i.options.clientExposed)
    if (!items) return ok([])
    // static items will not be queried from the database
    const queryedItems = items
      .filter(i => i.options.scope !== ScopeLookupStrategy.LOCAL_STATIC)
      .map(i => {
        const [scope, fallbackScope] = this.calculateScope(i.options.scope, context)
        return {
          key: i.key,
          scope,
          fallbackScope
        }
      })
    return (await findSettings(this.pool, queryedItems)).andThen(data => {
      const result = items.map(item => ({
        ...item,
        value: data?.find(r => r.key === item.key)?.value ?? item.defaultValue
      }))
      this.cache.set(cachedKey, result)
      return ok(result)
    })
  }

  /**
   * Find the config map item by key
   */
  protected findItem<T>(key: string): SettingsItem<T> | undefined {
    return this.configMap.find(i => i.key === key)
  }

  /**
   * Calculate the scope based on the session context
   */
  protected calculateScope(
    strategy: ScopeLookupStrategy = ScopeLookupStrategy.ROOT_ONLY,
    context: ScopeContext
  ): [scope: string, fallbackScope?: string] {
    const user = context.userId ? `.user_${context.userId}` : ''
    const space = context.spaceId ? `.space_${context.spaceId}` : ''

    switch (strategy) {
      case ScopeLookupStrategy.ROOT_ONLY:
        return [SCOPE_ROOT_NODE]
      case ScopeLookupStrategy.SPACE_BASED:
        return [
          `${SCOPE_ROOT_NODE}${space}${user}`,
          // fallback scope
          `${SCOPE_ROOT_NODE}${user}`
        ]
      case ScopeLookupStrategy.USER_BASED:
        return [
          `${SCOPE_ROOT_NODE}${user}${space}`,
          // fallback scope
          `${SCOPE_ROOT_NODE}${space}`
        ]
      default:
        throw new UnSupportedScopeLookupStrategyError(strategy)
    }
  }

  /**
   * generate a cache key for the given scope and key
   * @param key
   * @param scope
   * @returns
   */
  protected cachedKey(key: string, scope: string): string {
    return `${key}:${scope}`
  }

  protected allExportedItemsCachedKey(context: ScopeContext = {}): string {
    const ALL_EXPOSED_ITEMS_CACHED_KEY = 'all-exposed-items'
    return `${ALL_EXPOSED_ITEMS_CACHED_KEY}:${context.userId}.${context.spaceId}`
  }

  /**
   * Batch delete cached items
   */
  protected batchDeleteCache(keyPrefix: string): void {
    for (const key of this.cache.keys()) {
      // clear the cache for sub-scopes
      key.startsWith(keyPrefix) && this.cache.delete(key)
    }
  }
}
