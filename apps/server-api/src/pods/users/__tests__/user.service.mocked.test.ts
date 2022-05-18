import { createMockPool, createMockQueryResult } from '@brickdoc/nestjs-slonik'
import { getPoolToken } from '@brickdoc/nestjs-slonik/src/slonik.utils'
import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from '../user.service'

describe('UsersService mocked', () => {
  let userService: UserService
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
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
        UserService
      ]
    }).compile()

    userService = module.get<UserService>(UserService)
  })

  afterAll(async () => {
    await module.close()
  })

  it('should be defined', () => {
    expect(userService).toBeDefined()
  })
})
