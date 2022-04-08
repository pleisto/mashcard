import yargs from 'yargs'
import { exit } from 'process'
import { currentMigrator, dumpCurrentDbSchema } from '../utils'

export const command = 'db:repair'
export const describe = 'Repair hashes in the migration table.'
export const builder = (yargs: yargs.Argv): yargs.Argv =>
  yargs.option('dry-run', {
    describe: 'do not actually run the repair',
    type: 'boolean',
    default: false
  })

export const handler = async (argv: yargs.Arguments): Promise<void> => {
  const migrator = await currentMigrator()
  const dryRun = argv.dryRun as boolean
  await migrator.repair({ dryRun })
  if (!dryRun) await dumpCurrentDbSchema()
  exit(0)
}
