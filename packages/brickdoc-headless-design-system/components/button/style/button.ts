import type * as Stitches from '@stitches/react'
import { priority } from './priority'
import { size } from './size'
import { state } from './state'
// import { types } from './types'

export const variants: Stitches.VariantProps<typeof state> = {
  priority,
  size,
  ...state
}
