import { productinEnvInit } from './production'

export const enviromentsInit = (): void => {
  switch (globalThis.mashcardContext.env) {
    case 'production':
      productinEnvInit()
      break
  }
}
