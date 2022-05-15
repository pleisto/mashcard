import { Module } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { type DatabasePool, sql, createMockPool, createMockQueryResult, ConnectionError } from 'slonik'
import { getPoolToken, logger } from '../slonik.utils'
import { InjectPool } from '../slonik.decorator'
import { SlonikModule } from '../slonik.module'

@Module({})
class DBTestService {
  constructor(@InjectPool() public readonly db: DatabasePool) {}
}

let service: DBTestService

describe('SlonikModule', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getPoolToken(),
          useValue: createMockPool({
            query: async () => {
              return createMockQueryResult([
                {
                  foo: 'bar'
                }
              ])
            }
          })
        },
        DBTestService
      ]
    }).compile()
    service = moduleRef.get(DBTestService)
  })

  it('should injectPool work', async () => {
    expect(await service.db.oneFirst(sql`SELECT 1`)).toBeTruthy()
  })

  it('should throw ConnectionError', async () => {
    const errorLogger = jest.spyOn(logger, 'error').mockImplementation(() => {})
    const module = Test.createTestingModule({
      imports: [
        SlonikModule.forRootAsync({
          useFactory: () => ({
            connectionUri: 'postgres://nonExistingHost:5432/test',
            retryAttempts: 0,
            retryDelay: 100,
            verboseRetryLog: true,
            camelCaseFieldNames: true
          })
        })
      ]
    })
    await expect(module.compile()).rejects.toThrowError(ConnectionError)
    expect(errorLogger.mock.calls[0][1]).toContain('ConnectionError')
    errorLogger.mockRestore()
  })
})
