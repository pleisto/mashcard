import { Module } from '@nestjs/common'
import { GraphQLModule as ApolloGraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { join } from 'path/posix'
import { LoggingPlugin } from './logging.plugin'
import { IS_PROD_MODE } from '../../common/utils'
import { idSlugDirectiveTransformer, ID_SLUG_DIRECTIVE_NAME } from './directives/slug.directive'
import { DirectiveLocation, GraphQLDirective } from 'graphql'

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
        transformSchema: schema => idSlugDirectiveTransformer(schema, ID_SLUG_DIRECTIVE_NAME),
        buildSchemaOptions: {
          directives: [
            new GraphQLDirective({
              name: ID_SLUG_DIRECTIVE_NAME,
              locations: [DirectiveLocation.FIELD_DEFINITION]
            })
          ]
        },
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        autoTransformHttpErrors: false
      })
    })
  ],
  providers: [LoggingPlugin]
})
export class GraphQLModule {}
