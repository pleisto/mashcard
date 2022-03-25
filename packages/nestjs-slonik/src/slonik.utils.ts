import { Logger } from '@nestjs/common'
import { Observable, defer, lastValueFrom } from 'rxjs'
import { delay, scan, retryWhen } from 'rxjs/operators'
import { createPool, DatabasePool, Interceptor } from 'slonik'
import { DEFAULT_POOL_NAME, SlonikModuleOptions } from './slonik.interface'
import { camelCaseFieldNameTransformationInterceptor } from './interceptors'

const logger = new Logger('SlonikModule')

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

// eslint-disable-next-line max-params
export function handleRetry(
  retryAttempts = 9,
  retryDelay = 3000,
  poolName = DEFAULT_POOL_NAME,
  verboseRetryLog = false,
  toRetry?: (err: any) => boolean
): <T>(source: Observable<T>) => Observable<T> {
  return <T>(source: Observable<T>) =>
    source.pipe(
      retryWhen(e =>
        e.pipe(
          scan((errorCount, error: Error) => {
            if (toRetry && !toRetry(error)) throw error

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

export const createPoolFactory = async (options: SlonikModuleOptions): Promise<DatabasePool> => {
  const poolToken = getPoolName(options)

  const interceptors = (options.clientConfigurationInput?.interceptors as Interceptor[]) ?? []

  if (options.camelCaseFieldNames) interceptors.push(camelCaseFieldNameTransformationInterceptor())

  return await lastValueFrom(
    defer(async () => {
      const pool = createPool(options.connectionUri, {
        ...options.clientConfigurationInput,
        interceptors
      })

      // try to connect to database to catch errors if database is not reachable
      await pool.connect(async () => await Promise.resolve())

      return pool
    }).pipe(handleRetry(options.retryAttempts, options.retryDelay, poolToken, options.verboseRetryLog, options.toRetry))
  )
}
