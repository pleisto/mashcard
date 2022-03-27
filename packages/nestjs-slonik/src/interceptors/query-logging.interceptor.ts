import type { Interceptor, QueryContext } from 'slonik'
import { ms } from '@brickdoc/active-support'
import { logger } from '../slonik.utils'
import { err } from 'pino-std-serializers'
/**
 * check auto explain json message exist
 * @param noticeMessage
 * @returns
 */
const isAutoExplainJsonMessage = (noticeMessage: string): boolean => {
  return noticeMessage.trim().startsWith('duration:') && noticeMessage.includes('{')
}

type CallSite = NonNullable<QueryContext['stackTrace']>[0]

/**
 * stringify call site
 * @param callSite
 * @returns
 */
const stringifyCallSite = (callSite: CallSite): string => {
  return `${callSite.fileName}:${callSite.lineNumber}:${callSite.columnNumber}`
}

/**
 * generate query log context
 * @param context
 * @returns
 */
const loggerContext = (context: QueryContext): { [key: string]: any } => {
  const { queryId, poolId, connectionId } = context
  return {
    queryId,
    poolId,
    connectionId
  }
}

/**
 * calculate query time
 * @param context
 * @returns
 */
const calcExecutionTime = (context: QueryContext): number =>
  Number(process.hrtime.bigint() - BigInt(context.queryInputTime)) / 1_000_000

export const queryLoggingInterceptor = (): Interceptor => {
  return {
    afterQueryExecution: (context, _query, result) => {
      for (const notice of result.notices) {
        if (notice.message && isAutoExplainJsonMessage(notice.message)) {
          logger.log('Auto explain', {
            message: notice.message,
            ...loggerContext(context)
          })
        }
      }

      const executionTime = ms(calcExecutionTime(context))

      logger.debug('Query execution result', {
        executionTime,
        rowCount: result.rowCount,
        ...loggerContext(context)
      })

      return null
    },
    beforeQueryExecution: async (context, query) => {
      let stackTrace

      if (context.stackTrace) {
        stackTrace = []

        for (const callSite of context.stackTrace) {
          // Hide the internal call sites.
          if (
            callSite.fileName !== null &&
            !callSite.fileName.includes('slonik') &&
            !callSite.fileName.includes('next_tick')
          ) {
            stackTrace.push(stringifyCallSite(callSite))
          }
        }
      }

      const values = []

      for (const value of query.values) {
        values.push(Buffer.isBuffer(value) ? `[Buffer ${value.byteLength}]` : value)
      }

      logger.debug('Executing query', {
        sql: query.sql,
        stackTrace,
        values,
        ...loggerContext(context)
      })

      return null
    },
    queryExecutionError: (context, _query, error) => {
      logger.error('query execution produced an error', {
        error: err(error),
        ...loggerContext(context)
      })

      return null
    }
  }
}
