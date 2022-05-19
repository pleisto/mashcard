import '../../fastify.d' // fix cross-package reference error
import { FastifyRequest } from 'fastify'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const requestLoggingContext = (req: FastifyRequest) => ({
  remoteIp: req?.ip,
  protocol: req?.protocol,
  requestMethod: req?.method,
  requestUrl: req?.url,
  params: req?.params,
  userAgent: req?.headers?.['user-agent'],
  acceptLanguage: req?.headers?.['accept-language'],
  referer: req?.headers?.referer,
  userId: req?.user?.id
})
