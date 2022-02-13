import { getDbUrl, currentDbName, pgQuery, successLog } from '../utils'

export const command = 'db:create'
export const describe = 'Create a database based on current environment variable.'
export const builder = {}
export const handler = (_args: string[]): void => {
  void pgQuery(
    getDbUrl('postgres'),
    // PG can't use placeholders for identifiers (table names, column names, ...).
    { text: `CREATE DATABASE ${currentDbName()}` }
  )
    .then(() => {
      successLog(`Database ${currentDbName()} created.`)
    })
    .finally()
}
