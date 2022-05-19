/* eslint-disable @typescript-eslint/method-signature-style */
import { UserSession } from './pods/auth'
import { Session } from './common/session/session.class'

declare module 'fastify' {
  interface FastifyInstance {
    createSecureSession(data?: Record<string, any>): Session
    decodeSecureSession(cookie: string, log?: FastifyLoggerInstance): Session | null
    encodeSecureSession(session: Session): string
  }

  interface FastifyReply {
    setHeader: FastifyReply['raw']['setHeader']
    end: FastifyReply['raw']['end']
  }
  interface FastifyRequest {
    res: FastifyReply
    user: UserSession
    session: Session
  }
}
