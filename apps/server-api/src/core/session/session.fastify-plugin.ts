/* eslint-disable security-node/detect-buffer-unsafe-allocation */
import fp from 'fastify-plugin'
import { aeadEncrypt, aeadDecrypt } from '@brickdoc/server-api-crate'
import { FastifyPluginCallback } from 'fastify'
import { SecureSessionPluginOptions, kObj, kCookieOptions, SessionData } from './session.interface'
import { Session } from './session.class'
import { sessionProxyHandler } from './session.proxy-handler'

const sessionPlugin: FastifyPluginCallback<SecureSessionPluginOptions> = (fastify, options, next) => {
  const key = options.key

  const cookieName = 'brd_encrypted_payload'
  const cookieOptions = options.cookie ?? {}

  // just to add something to the shape
  fastify.decorateRequest('session', null)

  fastify.decorate('decodeSecureSession', (payload: string, log = fastify.log) => {
    if (payload === undefined) {
      log.trace('fastify-secure-session: there is no cookie, creating an empty session')
      return null
    }

    try {
      const decrypted = aeadDecrypt(payload, key)
      const session = new Proxy(new Session(JSON.parse(decrypted.toString('utf-8'))), sessionProxyHandler)
      return session
    } catch (e) {
      log.warn('fastify-secure-session: unable to decrypt, creating an empty session', e)
      return null
    }
  })

  fastify.decorate('createSecureSession', (data: SessionData) => new Proxy(new Session(data), sessionProxyHandler))

  fastify.decorate('encodeSecureSession', (session: Session) => {
    const msg = Buffer.from(JSON.stringify(session[kObj]))
    return aeadEncrypt(msg, key)
  })

  const addHooks: FastifyPluginCallback = (fastify, options, next): void => {
    fastify.addHook('onRequest', (request, reply, next) => {
      const cookie = request.cookies[cookieName]
      const result = fastify.decodeSecureSession(cookie, request.log)

      request.session = new Proxy(result ?? new Session({}), sessionProxyHandler)
      // NOTEs: automatically update the cookie expiration
      request.session.changed = true

      next()
    })

    fastify.addHook('onSend', (request, reply, payload, next) => {
      const session = request.session

      if (!session || !session.changed) {
        // nothing to do
        request.log.trace("fastify-secure-session: there is no session or the session didn't change, leaving it as is")
        next()
        return
      } else if (session.deleted) {
        request.log.debug('fastify-secure-session: deleting session')
        const tmpCookieOptions = { ...cookieOptions, ...session[kCookieOptions], expires: new Date(0), maxAge: 0 }
        void reply.setCookie(cookieName, '', tmpCookieOptions)
        next()
        return
      }

      request.log.trace('fastify-secure-session: setting session')
      void reply.setCookie(cookieName, fastify.encodeSecureSession(session), {
        ...cookieOptions,
        ...session[kCookieOptions]
      })

      next()
    })

    next()
  }

  void fastify.register(fp(addHooks))

  next()
}

export const SessionPlugin = fp(sessionPlugin, {
  fastify: '3.x',
  name: '@fastify/secure-session'
})
