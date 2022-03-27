import { Type, ModuleMetadata } from '@nestjs/common'
import { ClientConfigurationInput } from 'slonik'

export const SLONIK_MODULE_OPTIONS = Symbol('SlonikModuleOptions')
export const SLONIK_MODULE_ID = Symbol('SlonikModuleID')
export const DEFAULT_POOL_NAME = 'default'
export const LOGGER_NAME = 'SlonikModule'

export interface SlonikOptions {
  connectionUri: string
  clientConfigurationInput?: ClientConfigurationInput
}

export interface SlonikModuleOptions extends SlonikOptions {
  /**
   * Connection pool name
   */
  name?: string

  /**
   * If `true`, will show verbose error messages on each connection retry.
   */
  verboseRetryLog?: boolean
  /**
   * Number of times to retry connecting
   * Default: 10
   */
  retryAttempts?: number
  /**
   * Delay between connection retry attempts (ms)
   * Default: 3000
   */
  retryDelay?: number

  /**
   * open camelCaseFieldNameInterceptor
   */
  camelCaseFieldNames?: boolean
}

export interface SlonikOptionsFactory {
  createSlonikOptions: (poolName?: string) => Promise<SlonikModuleOptions> | SlonikModuleOptions
}

export interface SlonikModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string
  useExisting?: Type<SlonikOptionsFactory>
  useClass?: Type<SlonikOptionsFactory>
  useFactory?: (...args: any[]) => Promise<SlonikModuleOptions> | SlonikModuleOptions
  inject?: any[]
}
