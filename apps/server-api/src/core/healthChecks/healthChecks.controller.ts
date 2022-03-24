import { Controller, Get } from '@nestjs/common'
import { HealthCheck, HealthCheckService, HealthCheckResult } from '@nestjs/terminus'
import { RedisHealthIndicator } from './redis.health'

@Controller('.internal-apis')
export class HealthChecksController {
  constructor(private readonly health: HealthCheckService, private readonly redisIndicator: RedisHealthIndicator) {}

  @Get('readyz')
  @HealthCheck()
  async readyz(): Promise<HealthCheckResult> {
    return await this.health.check([async () => await this.redisIndicator.pingCheck('redis')])
  }

  @Get('livez')
  livez(): string {
    return 'OK'
  }
}
