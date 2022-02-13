import { main } from '@angular-devkit/schematics-cli/bin/schematics'
import yargs from 'yargs'

export const command = 'generate [schema]'
export const describe = 'generate new code'
export const aliases = ['g']
export const builder = (yargs: yargs.Argv): yargs.Argv =>
  yargs
    .options('list-schematics', {
      describe: 'List schematics from the collection, by name.',
      type: 'boolean'
    })
    .options('debug', {
      describe: `Debug mode.This is true by default if the collection is a relative
      path (in that case, turn off with --debug=false).`,
      type: 'boolean'
    })
    .options('allow-private', {
      describe: 'Allow access to private schematics.',
      type: 'boolean'
    })
    .options('dry-run', {
      describe: `Do not output anything, but instead just show what actions would be
      performed.Default to true if debug is also true.`,
      type: 'boolean'
    })
    .options('force', {
      describe: 'Force overwriting files that would otherwise be an error.',
      type: 'boolean'
    })
    .options('no-interactive', {
      describe: 'Disables interactive input prompts.',
      type: 'boolean'
    })
    .options('verbose', {
      describe: 'Show more verbose logging.',
      type: 'boolean'
    })

export const handler = (argv: yargs.Arguments): void => {
  const defaultCollection = '@brickdoc/devkit:'
  const args: string[] = []
  args.push(argv.schema ? `${defaultCollection}${argv.schema}` : defaultCollection)
  args.push(...process.argv.slice(3, process.argv.length).filter(v => v !== argv.schema))

  // Show help if no arguments are passed.
  if (args.length === 1 && args[0] === defaultCollection) {
    yargs.showHelp()
    console.log(`\nAvailable schematics:`)
    args.push('--list-schematics')
  }

  if (argv.debug || argv.verbose) console.debug(`Running schematics-cli with arguments: cli ${args.join(' ')}`)

  // Execute schematics-cli
  void main({ args })
}
