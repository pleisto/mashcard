import { FieldPolicy } from '@apollo/client'

export const currentPodDomain: FieldPolicy = {
  read(_) {
    return globalThis.brickdocContext.currentPod?.domain || ''
  }
}
