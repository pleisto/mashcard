import { Controller, Get } from '@nestjs/common'
import { HealthCheck, HealthCheckService, HealthCheckResult } from '@nestjs/terminus'
import { RedisHealthIndicator } from './redis.health'
import { PostgresHealthIndicator } from './postgres.health'

@Controller('.internal-apis')
export class HealthChecksController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly redisIndicator: RedisHealthIndicator,
    private readonly postgresIndicator: PostgresHealthIndicator
  ) {}

  @Get('readyz')
  @HealthCheck()
  async readyz(): Promise<HealthCheckResult> {
    return await this.health.check([
      async () => await this.redisIndicator.pingCheck(),
      async () => await this.postgresIndicator.pingCheck()
    ])
  }

  @Get('livez')
  livez(): string {
    return 'OK'
  }
}
