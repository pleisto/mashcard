import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { WebAppModule } from '@brickdoc/build-support'
import { AnyExceptionFilter } from './filters/any-exception.filter'
import { LoggerModule } from './logger/logger.module'
import { HealthChecksModule } from './healthChecks/healthChecks.module'
import { GraphQLModule } from './graphql/graphql.module'
import { MetadataModule } from './metadata/metadata.module'
import { CoreConfigMap } from './core.config-map'

@Module({
  imports: [HealthChecksModule, GraphQLModule, MetadataModule, LoggerModule, WebAppModule],
  providers: [
    CoreConfigMap,
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter
    }
  ]
})
export class CoreModule {}
