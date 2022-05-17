import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { SessionPlugin } from '../session/session.fastify-plugin'
import { ms } from '@brickdoc/active-support'

/**
 * Add Cookie-based session support to the application.
 */
export const sessionRegister = (app: NestFastifyApplication, secretKey: string, tlsEnabled: boolean): void => {
  void app.register(SessionPlugin, {
    key: secretKey,
    cookie: {
      httpOnly: true, // Only allow cookies to be sent over HTTP
      path: '/',
      sameSite: 'lax', // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite#lax
      secure: tlsEnabled, // set https only
      maxAge: Math.round(ms('2 weeks') / 1000) // maxAge (in seconds)
    }
  })
}
