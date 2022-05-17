import { Result } from '@brickdoc/active-support'

/**
 * JSON Parser with result wrapper
 */
export const safeJsonParse = Result.fromThrowable(JSON.parse)
