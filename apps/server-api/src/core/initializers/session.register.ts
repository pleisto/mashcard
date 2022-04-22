import { NestFastifyApplication } from '@nestjs/platform-fastify'
import secureSession from 'fastify-secure-session'
import { ms, Result } from '@brickdoc/active-support'

export const sessionRegister = (
  app: NestFastifyApplication,
  secretKey: string,
  tlsEnabled: Result<boolean | undefined, Error>
): void => {
  if (tlsEnabled.isErr()) throw tlsEnabled.error
  void app.register(secureSession, {
    cookieName: '__memex_secure__',
    key: Buffer.from(secretKey, 'hex'),
    cookie: {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: tlsEnabled.value,
      maxAge: Math.round(ms('2 weeks') / 1000) // maxAge (in seconds)
    }
  })
}
