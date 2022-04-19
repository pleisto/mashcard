import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { env } from 'process'
import { currentMigrator } from '../../cli/utils'

export const initCheckRegister = async (_app: NestFastifyApplication): Promise<void> => {
  // Check required environment variables are set
  const missedEnvVars = ['NODE_ENV', 'REDIS_URL', 'SECRET_KEY_SEED', 'DATABASE_URL_BASE', 'DATABASE_NAME'].filter(
    // eslint-disable-next-line no-prototype-builtins
    key => !env.hasOwnProperty(key)
  )
  if (missedEnvVars.length > 0) throw new Error(`Missing environment variables: ${missedEnvVars.join(', ')}`)

  // Check pending db migrations
  const migrator = await currentMigrator()
  const pendingMigrations = await migrator.pending()
  if (pendingMigrations.length > 0)
    throw new Error(`Pending database migrations: ${pendingMigrations.map(m => m.name).join(', ')}`)
}
