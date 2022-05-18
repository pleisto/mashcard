import { type DatabasePool, InjectPool } from '@brickdoc/nestjs-slonik'
import { getPoolToken } from '@brickdoc/nestjs-slonik/src/slonik.utils'
import { Module } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { sql, createMockPool, createMockQueryResult } from 'slonik'

@Module({})
class DBTestService {
  constructor(@InjectPool() public readonly db: DatabasePool) {}
}

let service: DBTestService
let moduleRef: TestingModule

describe('SlonikModule', () => {
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
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

  afterAll(async () => {
    await moduleRef?.close()
  })

  it('should injectPool work', async () => {
    expect(await service.db.oneFirst(sql`SELECT 1`)).toBeTruthy()
  })
})
