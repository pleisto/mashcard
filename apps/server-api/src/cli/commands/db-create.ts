import { systemDbConn, sql, currentDbName, Styles } from '../utils'

export const command = 'db:create'
export const describe = 'Create a database based on current environment variable.'
export const builder = {}
export const handler = async (_args: string[]): Promise<void> => {
  void (await systemDbConn()).connect(async conn => {
    await conn.query(sql`CREATE DATABASE ${sql.identifier([currentDbName!])}`)
    console.log(`${Styles.FgGreen}Database ${currentDbName} created.`)
  })
}
