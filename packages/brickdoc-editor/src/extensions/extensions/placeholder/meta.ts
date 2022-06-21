import { Node as ProsemirrorNode } from 'prosemirror-model'
import { ExtensionMeta } from '../../common'

export interface PlaceholderAttributes {}

export interface PlaceholderOptions {
  placeholder?: ((PlaceholderProps: { node: ProsemirrorNode; wrapperNode: ProsemirrorNode | null }) => string) | string
}

export const meta: ExtensionMeta = {
  name: 'placeholder',
  extensionType: 'extension'
}
