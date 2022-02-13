import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit', () => {
      // Use an asynchronous IIFE inside the callback
      void (async () => {
        await app.close()
      })()
    })
  }
}
