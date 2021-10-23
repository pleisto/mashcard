import { productinEnvInit } from "./production"

export const enviromentsInit = (): void => {
  switch (globalThis.brickdocContext.env) {
    case 'production':
      productinEnvInit()
      break
  }
}