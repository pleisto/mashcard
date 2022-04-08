import { dumpCurrentDbSchema, currentDbName, Styles } from '../utils'

export const command = 'db:dump'
export const describe = 'Dump the database schema to a file.'
export const builder = {}
export const handler = async (_args: string[]): Promise<void> => {
  await dumpCurrentDbSchema()
  console.log(`${Styles.FgGreen}Database ${currentDbName} schema dumped.`)
}
