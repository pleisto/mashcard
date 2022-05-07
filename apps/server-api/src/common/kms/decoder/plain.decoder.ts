import { SeedDecoder } from './base.decoder'

/**
 * Built-in Plain SeedDecoder Adapter.
 */
export class PlainSeedDecoder extends SeedDecoder {
  /**
   * Directly return the seed string.
   */
  async seed(rawSeed: Buffer): Promise<string> {
    return rawSeed.toString('utf8')
  }
}
