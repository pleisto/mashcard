import { cable } from '@/core/apollo'

export const actionCableInit = (): void => {
  globalThis.brickdocContext.wsCable = cable
}
