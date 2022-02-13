import { registerAs } from '@nestjs/config'
import { env } from 'process'

/**
 * Application Security configuration
 */
export const security = registerAs('security', () => ({
  secretKey: {
    seed: env.SECRET_KEY_SEED,
    seedDecoder: env.SECRET_KEY_SEED_DECODER ?? 'plain'
  },
  reversibleInt: env.SECURITY_REVERSIBLE_INT
}))
