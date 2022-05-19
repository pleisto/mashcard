import { Result } from 'neverthrow'

/**
 * JSON Parser with result wrapper
 */
export const safeJsonParse = Result.fromThrowable(JSON.parse)
