import { Module } from '@nestjs/common'
import { GraphQLModule as ApolloGraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { env } from 'process'
import { join } from 'path/posix'

@Module({
  imports: [
    ApolloGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        disableHealthCheck: true,
        sortSchema: true,
        debug: env.NODE_ENV !== 'production',
        path: '/.internal-apis/$graph',
        autoSchemaFile: join(process.cwd(), 'db/schema.gql'),
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()]
      })
    })
  ]
})
export class GraphQLModule {}
