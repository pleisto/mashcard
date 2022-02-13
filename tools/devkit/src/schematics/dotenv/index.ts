import { Schema as ComponentOptions } from './schema'
import { serverPath } from '../../utils'
import { generateKey } from '@brickdoc/cypherpunk'
import { Rule, url, apply, applyTemplates, chain, mergeWith, MergeStrategy, move } from '@angular-devkit/schematics'
import { Buffer } from 'buffer'
import { env } from 'process'

export function dotenv(options: ComponentOptions): Rule {
  const defaultPgUrl = env.DATABASE_URL
    ? `${env.DATABASE_URL.replace('_development', '').replace('_test', '')}`
    : 'postgres://localhost:5432/brickdoc'
  const defaultRedisUrl = env.REDIS_URL ? env.REDIS_URL : 'redis://localhost:6379/0'
  const applyDotenv = (env: string): Rule =>
    mergeWith(
      apply(url('./files'), [
        applyTemplates({
          dbUrl: options.dbUrl.startsWith('default') ? `${defaultPgUrl}_${env}` : `${options.dbUrl}_${env}`,
          redisUrl: options.redisUrl.startsWith('default') ? defaultRedisUrl : options.redisUrl,
          secretSeed: process.env.SECRET_KEY_SEED ?? generateSeed(),
          env
        }),
        move(serverPath)
      ]),
      MergeStrategy.Overwrite
    )

  return chain([applyDotenv('development'), applyDotenv('test')])
}

/**
 * Generate a base64 encoded secret key seed
 * @returns
 */
function generateSeed(): string {
  return Buffer.from(generateKey()).toString('base64')
}
