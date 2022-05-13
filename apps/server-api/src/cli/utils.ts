import { SlonikMigrator } from '@slonik/migrator'
import { DatabasePool } from '@brickdoc/nestjs-slonik'
import { createPoolFactory } from '@brickdoc/nestjs-slonik/src/slonik.utils'
import { env } from 'process'
import { join } from 'path'
import { writeFileSync } from 'fs'
import { spawn } from 'cross-spawn'
import { SERVER_SRC_ROOT } from '../common/utils'

export { sql } from '@brickdoc/nestjs-slonik'

/**
 * ANSI escape codes for add styles to console output.
 */
export enum Styles {
  FgGreen = '\x1b[32m',
  FgRed = '\x1b[31m',
  Bold = '\x1b[1m',
  ResetAll = '\x1b[0m',
  ResetBold = '\x1b[22m',
  ResetFg = '\x1b[39m'
}

const createPool = async (uri?: string): Promise<DatabasePool> => {
  if (!uri) throw new Error('Database URI is not defined.')
  return await createPoolFactory({ connectionUri: uri })
}

/**
 * Get the current database name from the environment variables.
 */
export const currentDbName = env.DATABASE_NAME

/**
 * Get the current database URI from the environment variables.
 */
const currentDbUri = `${env.DATABASE_URL_BASE}/${currentDbName}`

/**
 * Get the root path of the project.
 */
export const rootDir = join(SERVER_SRC_ROOT, '../')
/**
 * Get the db directory path.
 */
export const dbDir = join(rootDir, 'db')

/**
 * Get the migrations directory path.
 */
export const migrationDir = join(dbDir, 'migrations')

/**
 * Get the current database connection pool.
 */
export const currentDbConn = async (): Promise<DatabasePool> => {
  return await createPool(currentDbUri)
}

/**
 * Get the postgres default database connection pool for create/drop database.
 */
export const systemDbConn = async (): Promise<DatabasePool> => {
  return await createPool(env.DATABASE_URL_BASE)
}

/**
 * SlonikMigrator with current database connection pool.
 * @returns
 */
export const currentMigrator = async (): Promise<SlonikMigrator> => {
  const slonik = await currentDbConn()
  return new SlonikMigrator({
    migrationsPath: migrationDir,
    migrationTableName: 'db_migrations',
    slonik,
    logger: console
  })
}

/**
 * Dump current database's schema to a file.
 */
export const dumpCurrentDbSchema = async (): Promise<void> => {
  const dump = spawn('pg_dump', ['--dbname', currentDbUri, '--schema-only', '--no-owner'], { shell: true })
  const fileBanner = `-----------------------------------------------------------
-- THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY) --
-----------------------------------------------------------

`
  const contents = [fileBanner]
  for await (const data of dump.stdout) {
    const content = data
      .toString()
      .replace(/^(--|SET|SELECT pg_).*$/gm, '') // remove comments and server settings
      .replace(/(\n\n|\r\n\r\n)/g, '') // remove empty lines
      .replace(/;/g, ';\n') // add new line after each semicolon

    contents.push(content)
  }

  writeFileSync(join(dbDir, 'structure.sql'), `${contents.join('')}`, { encoding: 'utf8', flag: 'w' })
  console.log(`${Styles.FgGreen}Database schema dumped to ${dbDir}/structure.sql.`)
}
