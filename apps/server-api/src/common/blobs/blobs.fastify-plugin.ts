import fp from 'fastify-plugin'
import { FastifyPluginCallback } from 'fastify'
import createError from '@fastify/error'

const blobsStreamPlugin: FastifyPluginCallback = (fastify, _options, next) => {
  // Add content type parser that support any content type in the put method request
  fastify.addContentTypeParser('*', (req, _payload, done) => {
    // Only `put` method could parse any content type
    const INVALID_MEDIA_TYPE = createError('FST_ERR_CTP_INVALID_MEDIA_TYPE', 'Unsupported Media Type: %s', 415)
    const err = req.method === 'PUT' ? null : new INVALID_MEDIA_TYPE(req.headers['content-type'])

    // IncomingMessage(_payload) is extended by `stream.Readable`
    // so just directly return it
    done(err)
  })

  // Done plugin callbacks
  next()
}

export const BlobsPlugin = fp(blobsStreamPlugin, {
  fastify: '3.x'
})
