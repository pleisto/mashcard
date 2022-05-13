import { Module } from '@nestjs/common'
import { GraphQLModule as ApolloGraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { join } from 'path/posix'
import { LoggingPlugin } from './logging.plugin'
import { IS_PROD_MODE } from '../../common/utils'

@Module({
  imports: [
    ApolloGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        disableHealthCheck: true,
        sortSchema: true,
        debug: !IS_PROD_MODE,
        path: '/.internal-apis/$graph',
        autoSchemaFile: join(process.cwd(), 'db/schema.gql'),
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        autoTransformHttpErrors: false
      })
    })
  ],
  providers: [LoggingPlugin]
})
export class GraphQLModule {}
