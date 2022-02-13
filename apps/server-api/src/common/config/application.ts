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
 * Application configuration
 */
const baseUrl = env.SERVER_BASE_URL ?? 'http://localhost:3080'
export const application = registerAs('application', () => ({
  env: appEnv,
  port: parseInt(env.SERVER_PORT ?? '3080', 10),
  baseUrl,
  assetBaseUrl: env.SERVER_ASSET_BASE_URL ?? baseUrl,
  tlsEnabled: baseUrl.startsWith('https')
}))
