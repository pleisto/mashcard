import { uuid } from '@mashcard/active-support'

export const uuidInit = (): void => {
  globalThis.mashcardContext.uuid = uuid()
}
