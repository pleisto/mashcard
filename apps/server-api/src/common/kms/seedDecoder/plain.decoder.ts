import { SeedDecoder } from './base.decoder'
import { Buffer } from 'buffer'

export class PlainSeedDecoder extends SeedDecoder {
  /**
   * Decode raw seed via base64
   */
  get seed(): string {
    const buffer = Buffer.from(this.rawSeed, 'base64')
    return buffer.toString('utf8')
  }
}
