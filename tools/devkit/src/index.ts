#!/usr/bin/env node
// eslint-disable-next-line node/shebang
import './dotenv'
import 'v8-compile-cache'
import yargs, { CommandModule } from 'yargs'
import { isWorkspaceRoot, hideBin, errorLog } from './utils'
import { commands } from './commands'

// Required current working directory to be a workspace root.
if (!isWorkspaceRoot()) {
  errorLog('Please run this command from the root of a workspace.')
  process.exit(1)
}

yargs(hideBin(process.argv))
  .command(commands as unknown as CommandModule<{}, unknown>)
  .scriptName('yarn dev')
  .usage('Brickdoc Devkit')
  .strictCommands()
  .recommendCommands()
  .demandCommand(1)
  .parse()
