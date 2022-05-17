import { Injectable, Scope } from '@nestjs/common'
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus'
import { InjectPool, type DatabasePool, sql } from '@brickdoc/nestjs-slonik'

@Injectable({ scope: Scope.TRANSIENT })
export class PostgresHealthIndicator extends HealthIndicator {
  constructor(@InjectPool() private readonly pool: DatabasePool) {
    super()
  }

  async pingCheck(): Promise<HealthIndicatorResult> {
    const key = 'postgres'
    try {
      const ping = await this.pool.query(sql`SELECT 1;`)
      if (ping.rowCount !== 1) {
        throw new Error('Postgres is not available')
      }
      return this.getStatus(key, true)
    } catch (err) {
      throw new HealthCheckError('Connection to the postgresql server could not be established', { [key]: err })
    }
  }
}
