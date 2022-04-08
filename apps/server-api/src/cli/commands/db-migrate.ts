import yargs from 'yargs'
import { exit } from 'process'
import { currentMigrator, Styles, dumpCurrentDbSchema } from '../utils'

export const command = 'db:migrate'
export const describe = 'Run database migrations.'
export const builder = (yargs: yargs.Argv): yargs.Argv =>
  yargs
    .option('to', {
      describe: 'All migrations up to and including this one should be executed.',
      type: 'string'
    })
    .option('step', {
      describe: 'Run this many migrations. If not specified all migrations will be executed.',
      type: 'number'
    })
    .option('name', {
      describe: 'Explicity declare migration name(s) to be executed.',
      type: 'array'
    })
    .option('rerun', {
      describe:
        'Specify what action should be taken when a migration that has already been executed is passed to --name.',
      type: 'string',
      choices: ['THROW', 'SKIP', 'ALLOW'],
      default: 'THROW'
    })
    .conflicts('to', 'step')
    .conflicts('name', ['step', 'to'])

export const handler = async (argv: yargs.Arguments): Promise<void> => {
  const migrator = await currentMigrator()

  const options: any = {
    step: argv.step as number | undefined,
    to: argv.to as string | undefined,
    name: argv.name as string[] | undefined,
    rerun: argv.rerun as string
  }

  await migrator.up(options)
  console.log(`${Styles.FgGreen}Database Migrations applied.`)
  await dumpCurrentDbSchema()
  exit(0)
}
