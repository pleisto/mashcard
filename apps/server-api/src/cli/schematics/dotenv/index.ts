import { Rule, url, apply, applyTemplates, chain, mergeWith, MergeStrategy, move } from '@brickdoc/schematics'
import { Buffer } from 'buffer'
import { env } from 'process'
import { generateKey } from '@brickdoc/server-api-crate'
import { Schema as ComponentOptions } from './schema'

export function dotenv(options: ComponentOptions): Rule {
  const defaultPgUrl = env.DATABASE_URL_BASE ?? 'postgres://localhost:5432'
  const defaultRedisUrl = env.REDIS_URL ?? 'redis://localhost:6379'
  return chain([
    (): Rule =>
      mergeWith(
        apply(url('./files'), [
          applyTemplates({
            dbUrlBase: options.dbUrlBase?.startsWith('postgres') ? formatDbUrlBase(options.dbUrlBase) : defaultPgUrl,
            redisUrl: options.redisUrl?.startsWith('redis') ? options.redisUrl : defaultRedisUrl,
            secretSeed: process.env.SECRET_KEY_SEED ?? generateSeed()
          }),
          move('/')
        ]),
        MergeStrategy.Overwrite
      )
  ])
}

/**
 * Generate a base64 encoded secret key seed
 * @returns
 */
function generateSeed(): string {
  return `PlainSeedDecoder:${Buffer.from(generateKey()).toString('base64')}`
}

/**
 * Format a database url and remove the database name
 * @param url
 * @returns
 */
function formatDbUrlBase(url: string): string {
  const uri = new URL(url)
  const pgProtocol = uri.protocol
  // Since WHATWG URL Standard does not support the postgres protocol,
  // We need to use some hacky methods to parse the url.
  uri.protocol = 'https:'
  uri.pathname = ''
  uri.protocol = pgProtocol
  // return base uri without trailing slash
  return uri.toString().replace(/\/$/, '')
}
