import { getDbUrl, currentDbName, pgQuery, successLog } from '../utils'

export const command = 'db:drop'
export const describe = 'Drop a database based on current environment variable.'
export const builder = {}
export const handler = (_args: string[]): void => {
  void pgQuery(
    getDbUrl('postgres'),
    // PG can't use placeholders for identifiers (table names, column names, ...).
    { text: `DROP DATABASE ${currentDbName()}` }
  )
    .then(() => {
      successLog(`Database ${currentDbName()} dropped.`)
    })
    .finally()
}
