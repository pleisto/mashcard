#!/usr/bin/env node
/* eslint-disable node/shebang */
import { argv, env } from 'process'
import spawn from 'cross-spawn'
import { currentEnvFile, dotEnvExpand, dotEnvConfig } from '@brickdoc/dotenv'

dotEnvExpand(dotEnvConfig({ path: currentEnvFile() }))

const command = argv[2]
const args = argv.slice(3)

spawn(command, args, { stdio: 'inherit', env }).on('exit', exitCode => process.exit(exitCode ?? undefined))
