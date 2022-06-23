import { ExtensionMeta } from '../../common'

export interface SelectionOptions {
  HTMLAttributes?: Record<string, string>
}

export interface SelectAttributes {}

export const meta: ExtensionMeta = {
  name: 'selection',
  extensionType: 'extension'
}
