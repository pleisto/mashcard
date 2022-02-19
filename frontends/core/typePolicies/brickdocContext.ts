import { FieldPolicy } from '@apollo/client'

export const currentSpaceDomain: FieldPolicy = {
  read(_) {
    return globalThis.brickdocContext.currentSpace?.domain || ''
  }
}
