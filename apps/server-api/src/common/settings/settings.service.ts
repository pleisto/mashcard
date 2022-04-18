import { Injectable } from '@nestjs/common'
import LRU from 'lru-cache'
import { ConfigMapExplorer } from './config-map.explorer'
import { SettingsItem, SCOPE_ROOT_NODE, ScopeLookupStrategy, ScopeContext } from './settings.interface'
import { InjectPool, DatabasePool } from '@brickdoc/nestjs-slonik'
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
  async get<I, K extends keyof I = keyof I>(key: K, context: ScopeContext = {}): Promise<K | undefined> {
    const item = this.findItem<K>(key as string)
    if (!item) return undefined
    // LOCAL_STATIC items are not stored in the database
    if (item.options.scope === ScopeLookupStrategy.LOCAL_STATIC) return item.defaultValue

    const scope = this.calculateScope(item.options.scope, context)
    // try to get the value from the cache first
    const cachedKeyWithScope = this.cachedKey(key as string, scope)
    const cachedValue = this.cache.get(this.cachedKey(key as string, scope))
    if (cachedValue) return cachedValue as K

    // query the database
    let dbValue = await findSetting<K>(this.pool, item.key, scope)
    if (dbValue && item.options.encrypted) {
      const plain = this.kms.symmetricDecrypt(item.value as unknown as string, scope)
      dbValue = JSON.parse(plain) as K
    }

    // set cache after query
    const result = dbValue ?? item.defaultValue
    this.cache.set(cachedKeyWithScope, result)
    return result
  }

  /**
   * Update a setting value on the database
   * @param key
   * @param value
   * @param scope
   */
  async update<I, K extends keyof I = keyof I>(key: K, value: I[K], context: ScopeContext = {}): Promise<boolean> {
    const item = this.findItem<K>(key as string)
    if (!item) {
      console.error('Cannot find key `%s` in any ConfigMap. Only the defined items can be updated.', key)
      return false
    }

    if (item.options.scope === ScopeLookupStrategy.LOCAL_STATIC) {
      console.error(' Item `%s` has been set to `ScopeLookupStrategy.LOCAL_STATIC`, so it cannot be updated.', key)
      return false
    }

    // validate the value
    // todo: general error handling
    item.options.validation?.validateSync(value)

    const scope = this.calculateScope(item.options.scope, context)
    // encrypt value if needed
    const storedValue = item.options.encrypted ? this.kms.symmetricEncrypt(JSON.stringify(value), scope) : value
    const dbResult = await createOrUpdateSetting(this.pool, key as string, storedValue, scope)

    // if the update is successful, update the cache
    if (dbResult) {
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
  async allExposedItems(context: ScopeContext = {}): Promise<Array<SettingsItem<unknown>> | undefined> {
    // try to get the value from the cache first
    const cachedKey = this.allExportedItemsCachedKey(context)
    const cachedValue = this.cache.get(cachedKey)
    if (cachedValue) return cachedValue as Array<SettingsItem<unknown>>

    const items = this.configMap.filter(i => i.options.clientExposed)
    if (!items) return undefined
    // static items will not be queried from the database
    const queryedItems = items
      .filter(i => i.options.scope !== ScopeLookupStrategy.LOCAL_STATIC)
      .map(i => ({
        key: i.key,
        scope: this.calculateScope(i.options.scope, context)
      }))
    const dbResult = await findSettings(this.pool, queryedItems)
    const result = items.map(item => ({
      ...item,
      value: dbResult?.find(r => r.key === item.key)?.value ?? item.defaultValue
    }))
    this.cache.set(cachedKey, result)
    return result
  }

  /**
   * Find the config map item by key
   */
  protected findItem<T>(key: string): SettingsItem<T> | undefined {
    return this.configMap.find(i => i.key === key)
  }

  /**
   * calculate the scope based on the session context
   */
  protected calculateScope(
    strategy: ScopeLookupStrategy = ScopeLookupStrategy.ROOT_ONLY,
    context: ScopeContext
  ): string {
    const user = context.userId ? `.user_${context.userId}` : ''
    const workspace = context.workspaceId ? `.workspace_${context.workspaceId}` : ''

    switch (strategy) {
      case ScopeLookupStrategy.ROOT_ONLY:
        return SCOPE_ROOT_NODE
      case ScopeLookupStrategy.WORKSPACE_FIRST:
        return `${SCOPE_ROOT_NODE}${user}${workspace}`
      case ScopeLookupStrategy.USER_FIRST:
        return `${SCOPE_ROOT_NODE}${workspace}${user}`
      default:
        throw new Error('Unsupported scope lookup strategy')
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
    return `${ALL_EXPOSED_ITEMS_CACHED_KEY}:${context.userId}.${context.workspaceId}`
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
