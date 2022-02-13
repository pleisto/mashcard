import { Injectable, Scope } from '@nestjs/common'
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus'
import { PrismaService } from '../../common/prisma/prisma.service'

@Injectable({ scope: Scope.TRANSIENT })
export class PrismaHealthIndicator extends HealthIndicator {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.prisma.$queryRaw`SELECT 1`
      return this.getStatus(key, true)
    } catch (err) {
      throw new HealthCheckError('Connection to the database could not be established', { [key]: err })
    }
  }
}
