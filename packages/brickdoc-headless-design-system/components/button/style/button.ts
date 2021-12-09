import { size } from './size'
import { state } from './state'
import { type } from './type'

export const variants = {
  type,
  size,
  ...state
}
