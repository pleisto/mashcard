import { FastifyPluginAsync, type FastifyRequest, type FastifyReply } from 'fastify'
import fp from 'fastify-plugin'
import { NestFastifyApplication } from '@nestjs/platform-fastify'

declare module 'fastify' {
  interface FastifyReply {
    setHeader: FastifyReply['raw']['setHeader']
    end: FastifyReply['raw']['end']
  }
  interface FastifyRequest {
    res: FastifyReply
  }
}

// HACK: support redirect to fastify instance `request`
// SEE: https://github.com/nestjs/nest/issues/5702#issuecomment-979893525
const PassportPlugin: FastifyPluginAsync = async (fastify, _options) => {
  fastify.addHook('onRequest', (request: FastifyRequest, reply: FastifyReply, next) => {
    reply.setHeader = reply.raw.setHeader
    reply.end = reply.raw.end
    request.res = reply
    next()
  })
}

export const passportRegister = async (app: NestFastifyApplication): Promise<void> => {
  await app.register(fp(PassportPlugin))
}
