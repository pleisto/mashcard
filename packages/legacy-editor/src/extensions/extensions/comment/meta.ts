import { ExtensionMeta } from '../../common'

export interface CommentOptions {
  onSendComment?: () => void
}

export interface CommentAttributes {}

export const meta: ExtensionMeta = {
  name: 'comment',
  extensionType: 'extension'
}
