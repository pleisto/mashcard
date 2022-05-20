import { User } from '../user.object-type'
import { UserCredentialInput } from '../user.interface'
import { UserService } from '../user.service'
import { useAppInstance } from '../../../common/testing'

describe('UserService', () => {
  let userService: UserService

  const createInstance = useAppInstance(async (_app, moduleRef) => {
    userService = moduleRef.get<UserService>(UserService)
  })

  beforeAll(async () => {
    await createInstance
  })

  const input: UserCredentialInput = {
    provider: 'google',
    subject: '!!!',
    meta: {},
    avatarUrl: null,
    bio: null,
    locale: null,
    name: '!!!'
  }

  it('should create user by preferred', async () => {
    const subject1 = '123'
    const foo = 'foo 123 bar'
    const input1 = { ...input, subject: subject1, name: foo }
    const result = await userService.findOrCreateUser(input1)
    expect(result.isOk()).toBe(true)
    expect(result._unsafeUnwrap()).toMatchObject<Partial<User>>({
      isInitialized: false,
      avatarUrl: null,
      lockedAt: null,
      slug: 'foo123bar',
      name: foo
    })
    expect(typeof result._unsafeUnwrap().id).toBe('number')
    expect(typeof result._unsafeUnwrap().createdAt).toBe('number')

    const result2 = await userService.findOrCreateUser(input1)
    expect(result2.isOk()).toBe(true)
    expect(result2._unsafeUnwrap()).toEqual(result._unsafeUnwrap())
  })

  it('should create user by alternative', async () => {
    const subject2 = '456'
    const subject3 = '789'
    const bar = 'bar 456 foo'
    const input1 = { ...input, subject: subject2, name: bar }
    const input2 = { ...input, subject: subject3, name: bar }
    const result1 = await userService.findOrCreateUser(input1)
    expect(result1.isOk()).toBe(true)

    const result2 = await userService.findOrCreateUser(input2)
    expect(result2.isOk()).toBe(true)

    expect(result2._unsafeUnwrap()).toMatchObject<Partial<User>>({ name: bar })
    expect(result2._unsafeUnwrap().slug).toMatch(/^bar456foo-/)

    const result3 = await userService.findOrCreateUser(input1)
    expect(result3.isOk()).toBe(true)
    expect(result3._unsafeUnwrap()).toEqual(result1._unsafeUnwrap())

    const result4 = await userService.findOrCreateUser(input2)
    expect(result4.isOk()).toBe(true)
    expect(result4._unsafeUnwrap()).toEqual(result2._unsafeUnwrap())
  })

  it('find user ok', async () => {
    const subject1 = 'baz123'
    const baz = 'baz'
    const input1 = { ...input, subject: subject1, name: baz }
    const result = await userService.findOrCreateUser(input1)
    expect(result.isOk()).toBe(true)
    const id = result._unsafeUnwrap().id

    const result2 = await userService.findUserById(id)
    expect(result2.isOk()).toBe(true)
    expect(result2._unsafeUnwrap().slug).toEqual(baz)

    const result3 = await userService.findUserBySlug(baz)
    expect(result3.isOk()).toBe(true)
    expect(result3._unsafeUnwrap().id).toEqual(id)
  })

  it('user appearance', async () => {
    const user = { id: 123, slug: 'test' }
    const appearanceResult = await userService.findUserApprearance(user)
    expect(appearanceResult.isOk()).toBe(true)
    const timezone = appearanceResult._unsafeUnwrap().timezone

    const input = { locale: 'en-US', timezone: 'Africa/Mogadishu' } as const
    expect(timezone).not.toEqual(input.timezone)

    const result = await userService.updateUserAppearance(user, input)
    expect(result.isOk()).toBe(true)
    expect(result._unsafeUnwrap()).toEqual(true)

    const appearanceResult2 = await userService.findUserApprearance(user)
    expect(appearanceResult2.isOk()).toBe(true)
    expect(appearanceResult2._unsafeUnwrap().timezone).toEqual(input.timezone)
  })
})
