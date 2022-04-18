import { Module } from '@nestjs/common'
import { HealthChecksModule } from './healthChecks/healthChecks.module'
import { GraphQLModule } from './graphql/graphql.module'
import { MetadataModule } from './metadata/metadata.module'
import { CoreConfigMap } from './core.config-map'

@Module({
  imports: [HealthChecksModule, GraphQLModule, MetadataModule],
  providers: [CoreConfigMap]
})
export class CoreModule {}
