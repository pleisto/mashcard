import { FieldPolicy } from '@apollo/client'

export const currentPodWebid: FieldPolicy = {
  read(_) {
    return globalThis.brickdocContext.currentPod?.webid || ''
  }
}
