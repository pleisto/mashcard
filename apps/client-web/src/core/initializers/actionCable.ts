import { cable } from '@/core/apollo'

export const actionCableInit = (): void => {
  globalThis.mashcardContext.wsCable = cable
}
