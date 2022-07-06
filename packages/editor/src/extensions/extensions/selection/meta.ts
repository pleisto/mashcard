import { ExtensionMeta } from '../../common'

export interface SelectionOptions {
  textSelection: {
    className?: string
    style?: string
  }
  nodeSelection: {
    mouseSelection?: {
      className?: string
    }
    className?: string
    style?: string
  }
}

export interface SelectAttributes {}

export const meta: ExtensionMeta = {
  name: 'selection',
  extensionType: 'extension'
}
