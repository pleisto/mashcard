import { registerAs } from '@nestjs/config'
import { env } from 'process'

export enum AppEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Staging = 'staging'
}

export const appEnv = (env.NODE_ENV ?? AppEnv.Development) as AppEnv

/**
 * @deprecated Use `settings` instead.
 * Application configuration
 */
const baseUrl = env.SERVER_BASE_URL ?? 'http://localhost:3080'
export const application = registerAs('application', () => ({
  env: appEnv,
  baseUrl,
  tlsEnabled: baseUrl.startsWith('https')
}))
