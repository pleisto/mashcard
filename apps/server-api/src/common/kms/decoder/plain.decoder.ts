import { SeedDecoder } from './base.decoder'

export class PlainSeedDecoder extends SeedDecoder {
  /**
   * Decode raw seed via base64
   */
  async seed(rawSeed: Buffer): Promise<string> {
    return rawSeed.toString('utf8')
  }
}
