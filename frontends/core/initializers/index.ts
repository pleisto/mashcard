import { actionCableInit } from './actionCable'
import { i18nextInit } from './i18next'
import { timezoneInit } from './timezone'
import { uuidInit } from './uuid'
import { enviromentsInit } from './environments'

export const initialization = (): void => {
  timezoneInit()
  uuidInit()
  actionCableInit()
  i18nextInit()

  // Make sure `enviromentsInit` is the last one
  enviromentsInit()
}
