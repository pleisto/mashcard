import { Module } from '@nestjs/common'
import { GraphQLModule as ApolloGraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'
import { AppEnv } from '../../common/config/application'
import { join } from 'path/posix'

@Module({
  imports: [
    ApolloGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        disableHealthCheck: true,
        sortSchema: true,
        debug: configService.get('application.env') !== AppEnv.Production,
        path: '/.internal-apis/$graph',
        autoSchemaFile: join(process.cwd(), 'db/schema.gql'),
        playground: false
      })
    })
  ]
})
export class GraphQLModule {}
