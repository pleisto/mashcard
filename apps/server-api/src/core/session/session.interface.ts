/* eslint-disable @typescript-eslint/method-signature-style */
import { CookieSerializeOptions } from '@fastify/cookie'
import { FastifyLoggerInstance } from 'fastify'
import { Session } from './session.class'

export const kObj = Symbol('object')
export const kCookieOptions = Symbol('cookie options')

export interface SessionData {
  [key: string]: any
}

export interface SecureSessionPluginOptions {
  cookie?: CookieSerializeOptions
  key: string
}

declare module 'fastify' {
  interface FastifyInstance {
    createSecureSession(data?: Record<string, any>): Session
    decodeSecureSession(cookie: string, log?: FastifyLoggerInstance): Session | null
    encodeSecureSession(session: Session): string
  }

  interface FastifyRequest {
    session: Session
  }
}
