import {
  DatabasePool,
  TaggedTemplateLiteralInvocation,
  PrimitiveValueExpression,
  TypeNameIdentifier,
  QueryResult,
  StreamHandler,
  QueryStreamConfig,
  TransactionFunction
} from 'slonik/dist/src/types'
import { SlonikError } from 'slonik'
import { DatabaseError } from 'pg'
import { ResultAsync } from 'neverthrow'

type ExpectedError = SlonikError | DatabaseError

const defaultErrorHandler = (e: unknown): ExpectedError => {
  // returns Err(e) if it's expected error
  if (e instanceof SlonikError || e instanceof DatabaseError) return e
  // Panic all unexpected or irrecoverable errors
  throw e
}

/**
 * Query the database with result type
 * @param conn DatabasePool
 * @param errorHandler
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const withResultType = (conn: DatabasePool, errorHandler = defaultErrorHandler) => ({
  /**
   * Returns result rows.
   * It's similar to `query` except that it returns rows without fields information.
   */
  any: async <T>(
    sql: TaggedTemplateLiteralInvocation<T>,
    values?: PrimitiveValueExpression[]
  ): Promise<ResultAsync<readonly T[], ExpectedError>> =>
    await ResultAsync.fromPromise(conn.any(sql, values), errorHandler),
  /**
   * Returns value of the first column of every row in the result set.
   * returns `DataIntegrityError` if the query returns more than one column.
   */
  anyFirst: async <T, Row = Record<string, T>>(
    sql: TaggedTemplateLiteralInvocation<Row>,
    values?: PrimitiveValueExpression[]
  ): Promise<ResultAsync<ReadonlyArray<Row[keyof Row]>, ExpectedError>> =>
    await ResultAsync.fromPromise(conn.anyFirst(sql, values), errorHandler),

  /**
   * Returns a boolean value indicating whether query produces results.
   */
  exists: async <T>(
    sql: TaggedTemplateLiteralInvocation<T>,
    values?: PrimitiveValueExpression[]
  ): Promise<ResultAsync<boolean, ExpectedError>> =>
    await ResultAsync.fromPromise(conn.exists(sql, values), errorHandler),

  /**
   * Copies from a binary stream.
   * The binary stream is constructed using user supplied tupleList and
   * columnTypes values.
   */
  copyFromBinary: async (
    streamQuery: TaggedTemplateLiteralInvocation,
    tupleList: ReadonlyArray<readonly any[]>,
    columnTypes: readonly TypeNameIdentifier[]
  ): Promise<ResultAsync<Record<string, unknown> | null, ExpectedError>> =>
    await ResultAsync.fromPromise(conn.copyFromBinary(streamQuery, tupleList, columnTypes), errorHandler),

  /**
   * Returns result rows.
   * returns `NotFoundError` if the query returns no rows.
   */
  many: async <T>(
    sql: TaggedTemplateLiteralInvocation<T>,
    values?: PrimitiveValueExpression[]
  ): Promise<ResultAsync<readonly T[], ExpectedError>> =>
    await ResultAsync.fromPromise(conn.many(sql, values), errorHandler),

  /**
   * Returns value of the first column of every row in the result set.
   * returns `NotFoundError` if the query returns no rows.
   * returns `DataIntegrityError` if the query returns more than one column.
   */
  manyFirst: async <T, Row = Record<string, T>>(
    sql: TaggedTemplateLiteralInvocation<Row>,
    values?: PrimitiveValueExpression[]
  ): Promise<ResultAsync<ReadonlyArray<Row[keyof Row]>, ExpectedError>> =>
    await ResultAsync.fromPromise(conn.manyFirst(sql, values), errorHandler),

  /**
   * Selects the first row from the result.
   * returns `null` if row is not found.
   * returns `DataIntegrityError` if the query returns more than one column.
   */
  maybeOne: async <T>(
    sql: TaggedTemplateLiteralInvocation<T>,
    values?: PrimitiveValueExpression[]
  ): Promise<ResultAsync<T | null, ExpectedError>> =>
    await ResultAsync.fromPromise(conn.maybeOne(sql, values), errorHandler),

  /**
   * Returns value of the first column from the first row.
   * returns `null` if row is not found.
   * returns `DataIntegrityError` if the query returns more than one column/row.
   */
  maybeOneFirst: async <T, Row = Record<string, T>>(
    sql: TaggedTemplateLiteralInvocation<Row>,
    values?: PrimitiveValueExpression[]
  ): Promise<ResultAsync<Row[keyof Row] | null, ExpectedError>> =>
    await ResultAsync.fromPromise(conn.maybeOneFirst(sql, values), errorHandler),

  /**
   * Selects the first row from the result.
   * returns `NotFoundError` if row is not found.
   * returns `DataIntegrityError` if the query returns more than one column.
   */
  one: async <T>(
    sql: TaggedTemplateLiteralInvocation<T>,
    values?: PrimitiveValueExpression[]
  ): Promise<ResultAsync<T, ExpectedError>> => await ResultAsync.fromPromise(conn.one(sql, values), errorHandler),

  /**
   * Returns value of the first column from the first row.
   * returns `NotFoundError` if row is not found.
   * returns `DataIntegrityError` if the query returns more than one column/row.
   */
  oneFirst: async <T, Row = Record<string, T>>(
    sql: TaggedTemplateLiteralInvocation<Row>,
    values?: PrimitiveValueExpression[]
  ): Promise<ResultAsync<Row[keyof Row], ExpectedError>> =>
    await ResultAsync.fromPromise(conn.oneFirst(sql, values), errorHandler),

  /**
   * Same as node-pg#query
   */
  query: async <T>(
    sql: TaggedTemplateLiteralInvocation<T>,
    values?: PrimitiveValueExpression[]
  ): Promise<ResultAsync<QueryResult<T>, ExpectedError>> =>
    await ResultAsync.fromPromise(conn.query(sql, values), errorHandler),

  /**
   * Stream query results.
   */
  stream: async (
    sql: TaggedTemplateLiteralInvocation,
    streamHandler: StreamHandler,
    config?: QueryStreamConfig
  ): Promise<ResultAsync<Record<string, unknown> | null, ExpectedError>> =>
    await ResultAsync.fromPromise(conn.stream(sql, streamHandler, config), errorHandler),

  /**
   * SQL Transaction method
   */
  transaction: async <T>(
    handler: TransactionFunction<T>,
    transactionRetryLimit?: number
  ): Promise<ResultAsync<T, ExpectedError>> =>
    await ResultAsync.fromPromise(conn.transaction(handler, transactionRetryLimit), errorHandler)
})
