import { NestFastifyApplication } from '@nestjs/platform-fastify'
import type { ApolloServerBase } from 'apollo-server-core'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver } from '@nestjs/apollo'
import { CallBack, useAppInstance } from './http.utils'

/**
 * Create GraphQL server based on app module for testing
 *
 * @returns
 */
export const useAppInstanceWithGraphQL = async (
  beforeAllCallback?: CallBack,
  afterAllCallback?: CallBack
): Promise<() => [ApolloServerBase<any>, NestFastifyApplication]> => {
  let apollo: ApolloServerBase
  const instance = await useAppInstance(async (app, moduleRef) => {
    const graphqlModule = app.get<GraphQLModule<ApolloDriver>>(GraphQLModule)
    apollo = graphqlModule.graphQlAdapter?.instance
    await beforeAllCallback?.(app, moduleRef)
  }, afterAllCallback)
  return () => [apollo, instance()]
}
