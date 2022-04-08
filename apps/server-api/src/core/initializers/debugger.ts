import { NestFactory } from '@nestjs/core'
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface'
import { AppModule } from '../../app.module'

/**
 * Inject Context to Debugger console.
 *
 */
export async function registerDebugContext(options: NestApplicationContextOptions = {}): Promise<void> {
  /**
   * Register Server Application Context.
   * @see {@url https://code.visualstudio.com/docs/nodejs/nodejs-debugging} for more details.
   */
  const server = await NestFactory.createApplicationContext(AppModule, options)

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
