import { Module } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DatabasePool, sql, createMockPool, createMockQueryResult, ConnectionError } from 'slonik'
import { getPoolToken } from '../slonik.utils'
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
    const module = Test.createTestingModule({
      imports: [
        SlonikModule.forRoot({
          connectionUri: 'postgres://nonExistingHost:5432/test',
          retryAttempts: 0,
          retryDelay: 100,
          verboseRetryLog: true
        })
      ]
    })
    await expect(module.compile()).rejects.toThrowError(ConnectionError)
  })
})
