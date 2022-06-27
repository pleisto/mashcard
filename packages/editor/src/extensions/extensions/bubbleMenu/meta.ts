import { ExtensionMeta } from '../../common'
import { BubbleMenuViewPluginProps } from './bubbleMenuViewPlugin'

export type BubbleMenuOptions = Omit<BubbleMenuViewPluginProps, 'editor' | 'element'> & {
  element: HTMLElement | null
}

export interface BubbleMenuAttributes {}

export const meta: ExtensionMeta = {
  name: 'bubbleMenu',
  extensionType: 'extension'
}
