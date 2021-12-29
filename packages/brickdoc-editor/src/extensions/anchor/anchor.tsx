import { Mark, mergeAttributes } from '@tiptap/core'

export interface AnchorOptions {
  HTMLAttributes: Record<string, any>
}

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

const ANCHOR_ATTRIBUTE_NAME = 'data-anchor'

export const AnchorExtensioin = Mark.create<AnchorOptions>({
  name: 'anchor',

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
        ({ commands }) => {
          return commands.setMark(this.name)
        },
      toggleAnchor:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name)
        },
      unsetAnchor:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        }
    }
  }
})
