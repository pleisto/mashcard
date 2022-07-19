import BulletList from '@tiptap/extension-bullet-list'
import { ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: BulletList.name,
  extensionType: 'block'
}

export type { BulletListOptions } from '@tiptap/extension-bullet-list'
export interface BulletListAttributes {}
