import { CookieSerializeOptions } from '@fastify/cookie'

export const kObj = Symbol('object')
export const kCookieOptions = Symbol('cookie options')

export interface SessionData {
  [key: string]: any
}

export interface SecureSessionPluginOptions {
  cookie?: CookieSerializeOptions
  key: string
}
