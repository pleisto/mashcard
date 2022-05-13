import { BaseSeedDecoder } from './base.seed-decoder'

/**
 * Built-in Plain SeedDecoder Adapter.
 */
export class PlainSeedDecoder extends BaseSeedDecoder {
  /**
   * Directly return the seed string.
   */
  async seed(rawSeed: Buffer): Promise<string> {
    return rawSeed.toString('utf8')
  }
}
