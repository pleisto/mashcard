import { uuid } from '@brickdoc/active-support'

export const uuidInit = (): void => {
  globalThis.brickdocContext.uuid = uuid()
}
