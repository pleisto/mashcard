import { Test } from '@nestjs/testing'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import type { ApolloServerBase } from 'apollo-server-core'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver } from '@nestjs/apollo'
import { AppModule } from '../app.module'

/**
 * set up environment for graphql testing
 *
 * @returns
 */
export const useGraphQLTestingInstance = async (): Promise<() => [ApolloServerBase<any>, NestFastifyApplication]> => {
  let app: NestFastifyApplication
  let apollo: ApolloServerBase

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = moduleFixture.createNestApplication(new FastifyAdapter())
    await app.init()
    const graphqlModule = app.get<GraphQLModule<ApolloDriver>>(GraphQLModule)
    apollo = graphqlModule.graphQlAdapter?.instance
  })

  afterAll(async () => await app?.close())

  return () => [apollo, app]
}
