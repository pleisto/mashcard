import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HealthChecksController } from './healthChecks.controller'
import { PrismaHealthIndicator } from './prisma.health'
import { RedisHealthIndicator } from './redis.health'

@Module({
  controllers: [HealthChecksController],
  imports: [TerminusModule],
  providers: [PrismaHealthIndicator, RedisHealthIndicator]
})
export class HealthChecksModule {}
