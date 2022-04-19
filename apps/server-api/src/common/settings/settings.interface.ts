import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper'
import { BaseSchema } from 'yup'

const REFLECT_METADATA_PREFIX = 'brickdoc-settings:'
export const CONFIG_MAP_NAMESPACE_METADATA = `${REFLECT_METADATA_PREFIX}configMapNamespace`
export const ITEM_OPTIONS_METADATA = `${REFLECT_METADATA_PREFIX}itemOptions`
export const SCOPE_ROOT_NODE = 'root'

/**
 * scope lookup strategy
 */
export enum ScopeLookupStrategy {
  /**
   * Static item will not read/write from/to the database.
   * It's value will be get from the ConfigMap file directly.
   *
   * reading order:
   * 1. from the ConfigMap file
   */
  LOCAL_STATIC = 'local-static',

  /**
   * This is default strategy.
   * reading order:
   * 1. from db with scope: 'root'
   * 2. from the ConfigMap file
   */
  ROOT_ONLY = 'root-only',
  /**
   * reading order:
   * 1. from db with scope: 'workspace_*.user_*'
   * 2. from db with scope: 'workspace_*'
   * 3. from db with scope: 'user_*'
   * 4. from db with scope: 'root'
   * 5. from the ConfigMap file
   */
  WORKSPACE_BASED = 'workspace-based',
  /**
   * reading order:
   * 1. from db with scope: 'user_*.workspace_*'
   * 2. from db with scope: 'user_*'
   * 3. from db with scope: 'workspace_*'
   * 4. from db with scope: 'root'
   * 5. from the ConfigMap file
   */
  USER_BASED = 'user-based'
}

// todo: add mutual exclusion for `public` and `encrypted` properties
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
  workspaceId?: string
}
