import {
  createMockPool,
  createMockQueryResult,
  sql,
  NotFoundError,
  QueryResultRow,
  DatabasePool,
  DataIntegrityError
} from 'slonik'
import { withResultType } from '../result-type.helper'

/**
 * Creates a mock database pool
 */
const createMockDB = (result: QueryResultRow[] = []): DatabasePool =>
  createMockPool({
    query: async (query, values) => createMockQueryResult(result)
  })

describe('result-type', () => {
  describe('withResultType should work', () => {
    jest.useRealTimers()
    it('#any', async () => {
      const rows = [{ id: 1 }]
      const result = await withResultType(createMockDB(rows)).any(sql`SELECT foo`)
      expect(result.isOk()).toBe(true)
      expect(result._unsafeUnwrap()).toEqual(rows)
    })

    it('#anyFirst', async () => {
      const result = await withResultType(createMockDB([{ id: 1, error: 2 }])).anyFirst(sql`SELECT foo`)
      expect(result.isErr()).toBe(true)
      expect(result._unsafeUnwrapErr()).toBeInstanceOf(DataIntegrityError)
    })

    it('#exists', async () => {
      const result = await withResultType(
        createMockDB([
          {
            exists: 't'
          }
        ])
      ).exists(sql`SELECT LIMIT 1`)
      expect(result.isOk()).toBe(true)
      expect(result._unsafeUnwrap()).toBe(true)
    })

    it('#many', async () => {
      const result = await withResultType(createMockDB()).many(sql`SELECT foo`)
      expect(result.isErr()).toBe(true)
      expect(result._unsafeUnwrapErr()).toBeInstanceOf(NotFoundError)
    })

    it('#query', async () => {
      const rows = [{ id: 1 }]
      const result = await withResultType(createMockDB(rows)).query(sql`SELECT foo`)
      expect(result.isOk()).toBe(true)
      expect(result._unsafeUnwrap().rows).toEqual(rows)
    })

    it('should support all query methods', () => {
      const resultPool = withResultType(createMockDB()) as any
      ;[
        'any',
        'anyFirst',
        'exists',
        'copyFromBinary',
        'many',
        'manyFirst',
        'maybeOne',
        'maybeOneFirst',
        'one',
        'oneFirst',
        'query',
        'stream',
        'transaction'
        // eslint-disable-next-line max-nested-callbacks
      ].forEach(method => {
        expect(resultPool[method]).toBeInstanceOf(Function)
      })
    })
  })
})
