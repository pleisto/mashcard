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
   */
  LOCAL_STATIC = 'local-static',

  /**
   * scope: 'root'.
   */
  ROOT_ONLY = 'root-only',
  /**
   * scope: `root.user_.*.workspace_*`
   */
  WORKSPACE_FIRST = 'workspace-first',
  /**
   * scope: `root.workspace_*.user_*`
   */
  USER_FIRST = 'user-first'
}

// todo: add mutual exclusion for `public` and `encrypted` properties
export interface ItemOptions {
  /**
   * The public fields will be exposed to the client.
   */
  clientExposed?: boolean

  /**
   * Enabled data at rest encryption.
   * if `static` is true, encrypted will be ignored.
   */
  encrypted?: boolean

  /**
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
