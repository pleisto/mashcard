import { main } from '@angular-devkit/schematics-cli/bin/schematics'
import { hideBin } from 'yargs/helpers'

export * from '@angular-devkit/schematics'

/**
 * Run as schematics-cli with the specified default collections
 */
export function runAsCli(defaultCollection: string): void {
  const argv = hideBin(process.argv)
  const schemaArgIdx = argv.findIndex(v => !v.startsWith('-'))

  if (schemaArgIdx === -1) {
    // Add default collection when list-schematics without a collection name
    argv.includes('--list-schematics') && argv.unshift(defaultCollection)
  } else if (!argv[schemaArgIdx].includes(':')) {
    // Append default collection when no collection is specified
    argv[schemaArgIdx] = `${defaultCollection}${argv[schemaArgIdx]}`
  }

  // Show argv on verbose mode
  if (argv.includes('--verbose')) console.debug('call schematics-cli with argv:', argv)

  // Execute schematics-cli
  void main({ args: argv })
}
