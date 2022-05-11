import { NestFastifyApplication } from '@nestjs/platform-fastify'

/**
 * Inject Context to Debugger console.
 *
 */
export async function debugContextRegister(app: NestFastifyApplication): Promise<void> {
  /**
   * Register Server Application Context.
   * @see {@url https://code.visualstudio.com/docs/nodejs/nodejs-debugging} for more details.
   */

  /**
   * A token list that can be found by a token string.
   */
  const tokens = Array.from((app as any).instanceLinksHost.instanceLinks.keys())
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
  const get = (token: string): unknown => app.get(tokens[token])

  // @ts-expect-error
  globalThis.ctx = {
    app,
    tokens,
    get
  }
}
