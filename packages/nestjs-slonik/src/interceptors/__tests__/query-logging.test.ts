import { queryLoggingInterceptor } from '../query-logging.interceptor'
import { logger } from '../../slonik.utils'
import { QueryContext } from 'slonik'

const queryContext = {
  connectionId: '1',
  poolId: '1',
  sandbox: {},
  queryInputTime: process.hrtime.bigint()
} as unknown as QueryContext

const query = {
  sql: 'SELECT 1',
  values: []
}

describe('queryLoggingInterceptor.interceptor.ts', () => {
  let mockLogger: { [key: string]: jest.SpyInstance }

  beforeEach(() => {
    mockLogger = {
      debug: jest.spyOn(logger, 'debug').mockImplementation(() => {}),
      error: jest.spyOn(logger, 'error').mockImplementation(() => {})
    }
  })

  afterAll(() => {
    mockLogger.debug.mockRestore()
    mockLogger.error.mockRestore()
  })

  afterEach(() => {
    mockLogger.debug.mockClear()
    mockLogger.error.mockClear()
  })

  it('afterQueryExecution should work', () => {
    const interceptor = queryLoggingInterceptor()
    const { afterQueryExecution } = interceptor
    void afterQueryExecution!(queryContext, query, {
      command: 'SELECT',
      fields: [],
      notices: [],
      rowCount: 1,
      rows: []
    })
    expect(logger.debug).toHaveBeenCalled()
    expect(mockLogger.debug.mock.calls[0][0]).toBe('Query execution result')
  })

  it('beforeQueryExecution should work', () => {
    const interceptor = queryLoggingInterceptor()
    const { beforeQueryExecution } = interceptor
    const stackTrace = [
      {
        fileName: 'foo.ts',
        lineNumber: 1,
        columnNumber: 1,
        functionName: 'bar'
      }
    ]
    void beforeQueryExecution!(
      {
        ...queryContext,
        stackTrace
      },
      query
    )
    expect(logger.debug).toHaveBeenCalled()
    const log = mockLogger.debug.mock.calls[0][1]!
    expect(log.sql).toBe(query.sql)
    expect(log.stackTrace).toEqual([
      `${stackTrace[0].fileName}:${stackTrace[0].lineNumber}:${stackTrace[0].columnNumber}`
    ])
  })

  it('should queryExecutionError work', () => {
    const interceptor = queryLoggingInterceptor()
    const { queryExecutionError } = interceptor
    const errorMsg = 'foo'
    const error = new Error(errorMsg)
    void queryExecutionError!(queryContext, query, error, [])
    expect(logger.error).toHaveBeenCalled()
    expect(mockLogger.error.mock.calls[0][1]?.error?.message).toEqual(errorMsg)
  })
})
