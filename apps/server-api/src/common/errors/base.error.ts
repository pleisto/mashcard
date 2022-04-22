import { ErrorCode } from './errors.interface'
/**
 * The base error class for all errors in the application.
 *
 */
export class BrickdocBaseError extends Error {
  /**
   * Unique error name, must be globally unique.
   * e.g. `apiSrv.kms.INVALID_KEY_FORMAT`
   */
  name: string

  /**
   * It's developer-facing and must be in English.
   * And it's will be exposed to client.
   */
  message: string

  /**
   * It may be exposed to the client.
   */
  code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR

  /**
   * DO NOT STORE SENSITIVE DATA HERE. It may be exposed to the client.
   * And client could use it and name to generate a localized error message.
   * So it is recommended that all variables used in the `message` be stored there.
   */
  details: {
    [key: string]: any
  }

  /**
   * originalError is used to store the original error that was thrown
   */
  originalError: Error | undefined;

  /**
   * Append additional details to the error for server-side logging.
   */
  [key: string]: any

  constructor(name: string, message: string, originalError?: Error) {
    super(message)
    this.name = name
    this.originalError = originalError
    this.details = {}
  }
}
