import { registerAs } from '@nestjs/config'
import { env } from 'process'
import { RedisClientOptions } from '@node-redis/client/dist/lib/client'

interface databaseConfig {
  redis: RedisClientOptions<{}, {}>
  [key: string]: any
}

export const database = registerAs(
  'database',
  (): databaseConfig => ({
    redis: {
      url: env.REDIS_URL
    },
    databaseUrl: env.DATABASE_URL
  })
)
