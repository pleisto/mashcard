import { serverPath, currentCwd } from '../utils'
import { register, createRepl } from 'ts-node'
import path from 'path/posix'
import nodeRepl from 'repl'

export const command = 'console'
export const describe = 'Start the Brickdoc Server Console'
export const aliases = ['c']
export const builder = {}
export const handler = (_args: string[]): void => {
  const service = register({
    transpileOnly: true,
    experimentalReplAwait: true,
    require: [path.join(currentCwd, serverPath, 'src', 'repl.ts')],
    pretty: true
  })
  const repl = createRepl({ service })
  const replServer = nodeRepl.start({
    eval: repl.nodeEval,
    useColors: true,
    preview: true,
    useGlobal: true,
    prompt: 'brkdSrv> '
  })

  // release laked handles
  replServer.on('exit', () => process.exit(0))
}
