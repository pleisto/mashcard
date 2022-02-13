import { Module } from '@nestjs/common'
import { HealthChecksModule } from './healthChecks/healthChecks.module'
import { GraphQLModule } from './graphql/graphql.module'
import { MetadataModule } from './metadata/metadata.module'

@Module({
  imports: [HealthChecksModule, GraphQLModule, MetadataModule]
})
export class CoreModule {}
