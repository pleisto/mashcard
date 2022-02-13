/* eslint-disable no-console, node/no-process-env */
/**
 * REPL entry point
 * @see `tools/devkit/commands/console.ts`
 */
import { registerDebugContext } from './common/utils/debugger'

void registerDebugContext({
  logger: ['warn'],
  abortOnError: false
})

console.log(`Brickdoc Server Console
Loading ${process.env.NODE_ENV} environment
Type \`ctx\` to get the application context`)
