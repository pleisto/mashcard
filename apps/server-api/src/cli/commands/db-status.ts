import yargs from 'yargs'
import { exit } from 'process'
import { currentMigrator } from '../utils'

export const command = 'db:status'
export const describe = 'Show database migrate status.'
export const builder = {}

export const handler = async (_argv: yargs.Arguments): Promise<void> => {
  const migrator = await currentMigrator()
  const pendingMigrations = await migrator.pending()
  const executedMigrations = await migrator.executed()
  console.log('pending migrations:', pendingMigrations, '\n')
  console.log('executed migrations:', executedMigrations)
  exit(0)
}
