import { env } from 'process'
import { existsSync } from 'fs'
import { expand as dotEnvExpand } from 'dotenv-expand'

export { dotEnvExpand }
export { config as dotEnvConfig } from 'dotenv'

const nodeEnv = env.NODE_ENV ?? 'development'
// dotenv file path
export const envFilePath = [`.env.${nodeEnv}`, '.env']

export const currentEnvFile = (): string => {
  return envFilePath.filter(envFile => existsSync(envFile))?.[0]
}
