import { Injectable, Scope } from '@nestjs/common'
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus'
import { RedisService } from '../../common/redis/redis.service'

@Injectable({ scope: Scope.TRANSIENT })
export class RedisHealthIndicator extends HealthIndicator {
  constructor(private readonly redis: RedisService) {
    super()
  }

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.redis.ping()
      return this.getStatus(key, true)
    } catch (err) {
      throw new HealthCheckError('Connection to the redis server could not be established', { [key]: err })
    }
  }
}
