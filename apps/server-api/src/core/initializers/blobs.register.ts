import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { BlobsPlugin } from '../../common/blobs/blobs.fastify-plugin'
/**
 * Add stream file upload support to Fastify
 */
export const blobsRegister = (app: NestFastifyApplication): void => {
  // Add content-type parser
  void app.register(BlobsPlugin)
}
