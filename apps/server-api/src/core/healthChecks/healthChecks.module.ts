import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HealthChecksController } from './healthChecks.controller'
import { RedisHealthIndicator } from './redis.health'

@Module({
  controllers: [HealthChecksController],
  imports: [TerminusModule],
  providers: [RedisHealthIndicator]
})
export class HealthChecksModule {}
