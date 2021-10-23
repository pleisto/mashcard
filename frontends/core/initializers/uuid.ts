import { v4 } from 'uuid'

export const uuidInit = (): void => {
  globalThis.brickdocContext.uuid = v4()
}