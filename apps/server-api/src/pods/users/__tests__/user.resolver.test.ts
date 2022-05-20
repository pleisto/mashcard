import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { gql } from 'apollo-server-fastify'
import { useAppInstanceWithGraphQL } from '../../../common/testing'
import { UserService } from '../user.service'
import type { ApolloServerBase } from 'apollo-server-core'
import { Session } from '../../../core/session/session.class'
import { SESSION_USER_KEY } from '../../auth'
import { KMSService, SecretSubKey } from '../../../common/kms'
import { intEncrypt } from '@brickdoc/server-api-crate'
import { findUserByIdSpyFunction } from '../testing/mock-user.service'
import { UserAppearanceUpdateInput } from '../models/user_appearance_update.input-type'

describe('UserResolver', () => {
  let app: NestFastifyApplication
  let service: UserService
  let kms: KMSService
  let findUserByIdSpy: any
  let unmatchedSession: Session, matchedSession: Session, emptySession: Session

  let apollo: ApolloServerBase<any>
  const createInstance = useAppInstanceWithGraphQL(
    async (app, moduleRef) => {
      service = moduleRef.get<UserService>(UserService)
      findUserByIdSpy = jest.spyOn(service, 'findUserById').mockImplementation(findUserByIdSpyFunction)
    },
    async app => {
      findUserByIdSpy.mockRestore()
    }
  )

  beforeAll(async () => {
    const instance = (await createInstance)()
    apollo = instance[0]
    app = instance[1]
    kms = app.get<KMSService>(KMSService)
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    unmatchedSession = new Session({ [SESSION_USER_KEY]: { id: 0, slug: 'unmatched' } })
    matchedSession = new Session({ [SESSION_USER_KEY]: { id: 1, slug: 'matched' } })
    emptySession = new Session({})
  })

  afterEach(() => {
    apollo.requestOptions.context = {}
  })

  const currentUserQuery = gql`
    query {
      currentUser {
        id
        name
      }
    }
  `

  const logoutMutation = gql`
    mutation {
      logout
    }
  `

  it.todo('fix auth in graphql')

  // https://github.com/nestjs/graphql/issues/502
  // eslint-disable-next-line jest/no-disabled-tests
  it('currentUserQuery: user not found', async () => {
    apollo.requestOptions.context = { req: { session: unmatchedSession } }
    const result = await apollo.executeOperation({ query: currentUserQuery })
    expect(result.errors).not.toBeUndefined()
    expect(result.errors![0].message).toContain('User not found')
  })

  it('currentUserQuery: Unauthorized', async () => {
    apollo.requestOptions.context = { req: { session: emptySession } }
    const result = await apollo.executeOperation({ query: currentUserQuery })
    expect(result.errors).not.toBeUndefined()
    expect(result.errors![0].message).toContain('Unauthorized')
  })

  it('currentUserQuery: ok', async () => {
    apollo.requestOptions.context = { req: { session: matchedSession } }
    const result = await apollo.executeOperation({ query: currentUserQuery })
    expect(result.errors).toBeUndefined()
    expect(result.data?.currentUser.id).toBe(intEncrypt(1, kms.subKey(SecretSubKey.INT_ID_OBFUSCATION)))
  })

  it('logoutMutation: user not found', async () => {
    apollo.requestOptions.context = { req: { session: unmatchedSession } }
    const result = await apollo.executeOperation({ query: logoutMutation })
    expect(result.errors).toBeUndefined()
    expect(result.data?.logout).toBe(true)

    expect(apollo.requestOptions.context.req.session.get(SESSION_USER_KEY)).toBeUndefined()
    const result2 = await apollo.executeOperation({ query: currentUserQuery })
    expect(result2.errors).not.toBeUndefined()
    expect(result2.errors![0].message).toContain('Unauthorized')
  })

  it('logoutMutation: Unauthorized', async () => {
    apollo.requestOptions.context = { req: { session: emptySession } }
    const result = await apollo.executeOperation({ query: logoutMutation })
    expect(result.errors).not.toBeUndefined()
    expect(result.errors![0].message).toContain('Unauthorized')
  })

  it('logoutMutation: ok', async () => {
    apollo.requestOptions.context = { req: { session: matchedSession } }
    const result = await apollo.executeOperation({ query: logoutMutation })
    expect(result.errors).toBeUndefined()
    expect(result.data?.logout).toBe(true)

    expect(apollo.requestOptions.context.req.session.get(SESSION_USER_KEY)).toBeUndefined()
    const result2 = await apollo.executeOperation({ query: currentUserQuery })
    expect(result2.errors).not.toBeUndefined()
    expect(result2.errors![0].message).toContain('Unauthorized')
  })

  it('userAppearanceQuery: ok', async () => {
    const userAppearanceQuery = gql`
      query {
        userAppearance {
          locale
          timezone
        }
      }
    `
    apollo.requestOptions.context = { req: { session: matchedSession } }
    const result = await apollo.executeOperation({ query: userAppearanceQuery })
    expect(result.errors).toBeUndefined()
    expect(result.data?.userAppearance.locale).toBe('en-US')
  })

  it('userAppearanceUpdateMutation: ok', async () => {
    const userAppearanceUpdateMutation = gql`
      mutation ($input: UserAppearanceUpdateInput!) {
        userAppearanceUpdate(input: $input)
      }
    `
    apollo.requestOptions.context = { req: { session: matchedSession } }
    const input: UserAppearanceUpdateInput = { locale: 'en-US', timezone: 'Africa/Mogadishu' }
    const result = await apollo.executeOperation({
      query: userAppearanceUpdateMutation,
      variables: { input }
    })
    expect(result.errors).toBeUndefined()
    expect(result.data?.userAppearanceUpdate).toBe(true)
  })
})
