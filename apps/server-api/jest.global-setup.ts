import '@brickdoc/dotenv/src/config'
import { env } from 'process'
import { join } from 'path'
import { readFileSync } from 'fs'
import { raw } from 'slonik-sql-tag-raw'
import { currentDbConn, sql, dbDir } from './src/cli/utils'

// eslint-disable-next-line func-names
module.exports = async function (): Promise<void> {
  if (env.NODE_ENV !== 'test') {
    throw new Error('jest.global-setup.ts is only executed in NODE.ENV=test')
  }

  await (
    await currentDbConn()
  ).connect(async conn => {
    // Clean up the testing database.
    await conn.query(sql`DROP SCHEMA public CASCADE;CREATE SCHEMA public;`)
    // Load database schema from 'db/structure.sql'.
    const dbSchema = readFileSync(join(dbDir, 'structure.sql'), 'utf8')
    await conn.query(sql`${raw(dbSchema)}`)
  })
}
