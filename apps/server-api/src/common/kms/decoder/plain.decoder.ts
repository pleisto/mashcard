import { SeedDecoder } from './base.decoder'

export class PlainSeedDecoder extends SeedDecoder {
  /**
   * Decode raw seed via base64
   */
  get seed(): string {
    return this.rawSeed.toString('utf8')
  }
}
