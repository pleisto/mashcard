import { Logger } from '@nestjs/common'
import { Observable, defer, lastValueFrom } from 'rxjs'
import { delay, scan, retryWhen } from 'rxjs/operators'
import { createPool, DatabasePool, Interceptor } from 'slonik'
import { DEFAULT_POOL_NAME, SlonikModuleOptions, LOGGER_NAME } from './slonik.interface'
import { camelCaseFieldNameInterceptor, queryLoggingInterceptor } from './interceptors'

/**
 * Create NestJS Logger instance from Slonik
 */
export const logger = new Logger(LOGGER_NAME)

/**
 * Get pool name from options or use default
 * @param options
 * @returns
 */
export function getPoolName(options: SlonikModuleOptions): string {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  return options?.name || DEFAULT_POOL_NAME
}

/**
 * This function returns a Pool injection token for the given SlonikModuleOptions or pool name.
 * @param options {SlonikModuleOptions | string} [options='default'] This optional parameter is either
 * a SlonikModuleOptions or a string.
 * @returns {string} The Pool injection token.
 */
export function getPoolToken(options: SlonikModuleOptions | string = DEFAULT_POOL_NAME): string {
  const name = typeof options === 'string' ? options : getPoolName(options)

  return `${name}PostgresPool`
}

/**
 * Retry strategy for Slonik
 * @param retryAttempts Number of retries
 * @param retryDelay Delay between retries
 * @param poolName Name of the pool
 * @param verboseRetryLog Whether to log retry attempts
 * @returns
 */
// eslint-disable-next-line max-params
export function handleRetry(
  retryAttempts = 9,
  retryDelay = 3000,
  poolName = DEFAULT_POOL_NAME,
  verboseRetryLog = false
): <T>(source: Observable<T>) => Observable<T> {
  return <T>(source: Observable<T>) =>
    source.pipe(
      retryWhen(e =>
        e.pipe(
          scan((errorCount, error: Error) => {
            const poolInfo = poolName === DEFAULT_POOL_NAME ? '' : ` (${poolName})`
            const verboseMessage = verboseRetryLog ? ` Message: ${error.message}.` : ''

            logger.error(
              `Unable to connect to the database${poolInfo}.${verboseMessage} Retrying (${errorCount + 1})...`,
              error.stack
            )
            if (errorCount + 1 >= retryAttempts) throw error

            return errorCount + 1
          }, 0),
          delay(retryDelay)
        )
      )
    )
}

/**
 * Factory function for create a Slonik pool
 * @param options
 * @returns
 */
export const createPoolFactory = async (options: SlonikModuleOptions): Promise<DatabasePool> => {
  const poolToken = getPoolName(options)

  // Set default interceptors
  const interceptors: Interceptor[] = [queryLoggingInterceptor()]
  if (options.camelCaseFieldNames) interceptors.push(camelCaseFieldNameInterceptor())

  return await lastValueFrom(
    defer(async () => {
      const pool = createPool(options.connectionUri, {
        ...options.clientConfigurationInput,
        interceptors
      })

      // try to connect to database to catch errors if database is not reachable
      await pool.connect(async () => await Promise.resolve())

      return pool
    }).pipe(handleRetry(options.retryAttempts, options.retryDelay, poolToken, options.verboseRetryLog))
  )
}
