import { mergeAttributes } from '@tiptap/core'
import { createMark } from '../../common'
import { meta } from './meta'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    anchor: {
      /**
       * Set a anchor mark
       */
      setAnchor: () => ReturnType
      /**
       * Toggle a anchor mark
       */
      toggleAnchor: () => ReturnType
      /**
       * Unset a bold mark
       */
      unsetAnchor: () => ReturnType
    }
  }
}

export interface AnchorOptions {
  HTMLAttributes: Record<string, any>
}

export interface AnchorAttributes {}

const ANCHOR_ATTRIBUTE_NAME = 'data-anchor'

export const Anchor = createMark<AnchorOptions, AnchorAttributes>({
  name: meta.name,

  addOptions() {
    return {
      HTMLAttributes: {
        [ANCHOR_ATTRIBUTE_NAME]: true
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: node => !!(node as HTMLElement).getAttribute(ANCHOR_ATTRIBUTE_NAME) && null
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setAnchor:
        () =>
        ({ commands }) =>
          commands.setMark(this.name),
      toggleAnchor:
        () =>
        ({ commands }) =>
          commands.toggleMark(this.name),
      unsetAnchor:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name)
    }
  }
})
