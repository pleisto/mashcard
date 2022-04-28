// eslint-disable-next-line max-classes-per-file
import { BrickdocBaseError, ErrorCode } from '../errors'

class ServerPluginError extends BrickdocBaseError {
  constructor(name: string, message: string, originalError?: Error) {
    super(`core.server-plugin.${name}`, message, originalError)
  }
}

export class NotFoundError extends ServerPluginError {
  constructor(addonsId: string, reason = "It's not exist in the plugins directory or package.json is invalid") {
    super('NOT_FOUND', `Cannot not find enabled server plugin \`${addonsId}\`. ${reason}`)
    this.code = ErrorCode.NOT_FOUND
    this.details = {
      addonsId,
      reason
    }
  }
}
