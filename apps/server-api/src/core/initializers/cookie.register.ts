import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { FastifyPluginCallback } from 'fastify'
import { fastifyCookie } from 'fastify-cookie'
import { genericHash } from '@brickdoc/cypherpunk'

interface CustomSigner {
  sign: (value: string) => string
  unsign: (value: string) => {
    valid: boolean
    renew: boolean
    value: string
  }
}

/**
 * Fixed error type definition for `fastify-cookie`
 * to add custom signer support
 */
interface FastifyCookieOptions {
  secret?: string | string[] | CustomSigner
  parseOptions?: {
    decode?: (value: string) => string
  }
}

export const cookieRegister = (app: NestFastifyApplication, secretKey: string): void => {
  const separator = '$'
  void app.register(fastifyCookie as FastifyPluginCallback<NonNullable<FastifyCookieOptions>>, {
    /**
     * use blake3 as custom cookie signer
     */
    secret: {
      sign: (value: string) => {
        return `${value}${separator}${genericHash(value, secretKey)}`
      },
      unsign: (raw: string) => {
        const [value, hash] = raw.split(separator)
        return {
          valid: hash === genericHash(value, secretKey),
          renew: false,
          value
        }
      }
    }
  })
}
