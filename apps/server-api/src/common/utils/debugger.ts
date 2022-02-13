import { NestFactory } from '@nestjs/core'
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface'
import { ServerModule } from '../../server.module'

export const v8InspectorEnabled =
  typeof (globalThis as any).v8debug === 'object' || /--debug|--inspect/.test(process.execArgv.join(' '))

/**
 * Inject Context to Debugger console or REPL Runtime.
 */
export async function registerDebugContext(options: NestApplicationContextOptions = {}): Promise<void> {
  /**
   * Get Server Application Context.
   */
  const server = await NestFactory.createApplicationContext(ServerModule, options)

  /**
   * A token list that can be found by a token string.
   */
  const tokens = Array.from((server as any).instanceLinksHost.instanceLinks.keys())
    // eslint-disable-next-line no-return-assign
    .reduce(
      (obj, token) =>
        Object.assign(obj, {
          [typeof token === 'function' ? token.name : (token as any)]: token
        }),
      {}
    ) as { [key: string]: any }

  /**
   * A Shortcut to get IoC provider by token string.
   * @param token
   * @returns IoC Provider Instance
   */
  const get = (token: string): unknown => server.get(tokens[token])

  // @ts-expect-error
  globalThis.ctx = {
    server,
    tokens,
    get
  }
}
