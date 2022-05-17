import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HealthChecksController } from './healthChecks.controller'
import { RedisHealthIndicator } from './redis.health'
import { PostgresHealthIndicator } from './postgres.health'

@Module({
  controllers: [HealthChecksController],
  imports: [TerminusModule],
  providers: [RedisHealthIndicator, PostgresHealthIndicator]
})
export class HealthChecksModule {}
