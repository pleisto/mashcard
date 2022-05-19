import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { fastifyHelmet } from '@fastify/helmet'
import { IS_PROD_MODE } from '../../common/utils'

export const helmetRegister = async (app: NestFastifyApplication, tlsEnabled: boolean): Promise<void> => {
  await app.register(fastifyHelmet, {
    /**
     * For Apollo landing page:
     * - apollo-server-landing-page.cdn.apollographql.com
     *
     * For Google Font:
     * - fonts.googleapis.com
     * - fonts.gstatic.com
     */
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`, 'fonts.googleapis.com', 'cdn.jsdelivr.net'],
        fontSrc: [`'self'`, 'fonts.gstatic.com'],
        imgSrc: [`'self'`, 'https:', 'data:', 'blob:'],
        mediaSrc: [`'self'`, 'https:', 'data:', 'blob:'],
        scriptSrc: [`'self'`, `'unsafe-inline'`, `cdn.jsdelivr.net`],
        connectSrc: [`'self'`, 'wss:'],
        manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com']
      }
    },
    crossOriginEmbedderPolicy: false,
    // add HSTS header to all requests when TLS is enabled and server is in production mode
    hsts: IS_PROD_MODE && tlsEnabled
  })
}
