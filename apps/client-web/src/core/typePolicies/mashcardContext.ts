import { currentPodUsername } from '@/common/utils/currentPodUsername'
import { FieldPolicy } from '@apollo/client'

export const currentPodDomain: FieldPolicy = {
  read(_) {
    return currentPodUsername(globalThis.mashcardContext)
  }
}
