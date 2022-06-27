// https://github.com/ueberdosis/tiptap/tree/main/packages/extension-bubble-menu
import { createExtension } from '../../common'

import { BubbleMenuViewPlugin } from './bubbleMenuViewPlugin'
import { BubbleMenuAttributes, BubbleMenuOptions } from './meta'

export const BubbleMenu = createExtension<BubbleMenuOptions, BubbleMenuAttributes>({
  name: 'bubbleMenu',

  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: 'bubbleMenu',
      shouldShow: null
    }
  },

  addProseMirrorPlugins() {
    if (!this.options.element) {
      return []
    }

    return [
      BubbleMenuViewPlugin({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow
      })
    ]
  }
})
