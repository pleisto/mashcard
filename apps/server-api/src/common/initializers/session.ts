import { NestFastifyApplication } from '@nestjs/platform-fastify'
import secureSession from 'fastify-secure-session'
import { ms } from '@brickdoc/active-support'

export const sessionRegister = (app: NestFastifyApplication, secretKey: string, tlsEnabled: boolean): void => {
  void app.register(secureSession, {
    cookieName: '__memex_secure__',
    key: Buffer.from(secretKey, 'hex'),
    cookie: {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: tlsEnabled,
      maxAge: Math.round(ms('2 weeks') / 1000) // maxAge (in seconds)
    }
  })
}
