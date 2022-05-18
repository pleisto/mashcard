// eslint-disable-next-line max-classes-per-file
import { BrickdocBaseError, ErrorCode } from '../../common/errors'

class AuthError extends BrickdocBaseError {
  constructor(name: string, message: string, originalError?: Error) {
    super(`core.auth.${name}`, message, originalError)
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message: string, payload: Record<string, string>, originalError?: Error) {
    super('UNAUTHORIZED', message, originalError)
    this.code = ErrorCode.UNAUTHORIZED
    this.details = { payload }
  }
}
