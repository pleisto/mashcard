import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper'
import { BaseSchema } from 'yup'

const REFLECT_METADATA_PREFIX = 'brickdoc-settings:'
export const CONFIG_MAP_NAMESPACE_METADATA = `${REFLECT_METADATA_PREFIX}configMapNamespace`
export const ITEM_OPTIONS_METADATA = `${REFLECT_METADATA_PREFIX}itemOptions`
export const SCOPE_ROOT_NODE = 'root'

/**
 * Scope lookup strategy for config item.
 */
export enum ScopeLookupStrategy {
  /**
   * LOCAL_STATIC means that config value is use static value and don't support modification.
   *
   * reading order:
   * 1. from the ConfigMap file
   */
  LOCAL_STATIC = 'local-static',

  /**
   * This is default strategy.
   * ROOT_ONLY means that values will try to be read from database,
   * or use default value defined in ConfigMap as fallback.
   * In database this value is global, and can be used by multiple tenants(scope context).
   *
   * reading order:
   * 1. from db with scope: 'root'
   * 2. from the ConfigMap default value
   */
  ROOT_ONLY = 'root-only',
  /**
   * SPACE_BASED means that values will try to be read from database,
   * and could override the value for different tenants(scope context).
   * If the scope context has both spaceId and userId, it will allow to
   * set different value for different users in the same space.
   *
   * reading order if scopeContext is `{user:x, space:y}`:
   * 1. from db with scope: 'space_y.user_x'
   * 2. from db with scope: 'space_y'
   * 3. from db with scope: 'user_x'
   * 4. from db with scope: 'root'
   * 5. from the ConfigMap default value
   */
  SPACE_BASED = 'space-based',
  /**
   * USER_BASED means that values will try to be read from database,
   * and could override the value for different tenants(scope context).
   * If the scope context has both spaceId and userId, it will allow to
   * set different value for different spaces in the same user.
   *
   * reading order if scopeContext is `{user:x, space:y}`:
   * 1. from db with scope: 'user_x.space_y'
   * 2. from db with scope: 'user_x'
   * 3. from db with scope: 'space_y'
   * 4. from db with scope: 'root'
   * 5. from the ConfigMap default value
   */
  USER_BASED = 'user-based'
}

// todo: add mutual exclusion for `public` and `encrypted` properties
/**
 * ConfigMap item options
 */
export interface ItemOptions {
  /**
   * The public fields will be exposed to the client.
   */
  clientExposed?: boolean

  /**
   * Enabled data at rest encryption.
   * if `clientExposed` is true or scope is`LOCAL_STATIC`, encrypted will be ignored.
   */
  encrypted?: boolean

  /**
   * Ordering strategy when recursively resolving scopes.
   * Defaults to `ScopeLookupStrategy.ROOT_ONLY`.
   */
  scope?: ScopeLookupStrategy

  /**
   * yup schema for validation
   */
  validation?: BaseSchema
}

export interface ConfigMapProviders {
  [namespace: string]: InstanceWrapper
}

export interface SettingsItem<T> {
  key: string
  value?: T
  defaultValue: T
  options: ItemOptions
}

/**
 * session context for calculating scope
 */
export interface ScopeContext {
  userId?: string
  spaceId?: string
}
