#!/usr/bin/env node
// eslint-disable-next-line node/shebang
import yargs, { CommandModule } from 'yargs'
import { hideBin } from 'yargs/helpers'
import { commands } from './commands'
import { command as ServerCommand, aliases as ServerAliases } from './commands/server'

function runCli(): void {
  void yargs(hideBin(process.argv))
    .command(commands as unknown as CommandModule<{}, unknown>)
    .scriptName('yarn cli')
    .usage('Brickdoc API Server CLI')
    .strictCommands()
    .recommendCommands()
    .demandCommand(1)
    .parse()
}

type ServerBootstrapFunc = () => Promise<void>

/**
 * CLI entry point.
 * @param runServer Server bootstrap function.
 */
export async function runCliOrServer(runServer: ServerBootstrapFunc): Promise<void> {
  const mainCommand = process.argv[2]
  if (mainCommand === ServerCommand || ServerAliases.includes(mainCommand)) {
    await runServer()
  } else {
    runCli()
  }
}
