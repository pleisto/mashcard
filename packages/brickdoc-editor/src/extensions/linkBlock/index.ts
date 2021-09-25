import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { LinkBlock } from './LinkBlock'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    linkBlock: {
      /**
       * Set a linkBlock
       */
      setLinkBlock: (position?: number) => ReturnType
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LinkBlockOptions {}

export const LinkBlockExtension = Node.create<LinkBlockOptions>({
  name: 'linkBlock',

  defaultOptions: {},

  group: 'block',

  atom: true,

  selectable: false,

  addAttributes() {
    return {
      ...this.parent?.(),
      link: {
        default: {
          type: 'LINK'
        }
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'link-block'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['link-block', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(LinkBlock)
  },

  addCommands() {
    return {
      setLinkBlock:
        (position?: number) =>
        ({ commands }) => {
          const content = { type: this.name }
          if (position) return commands.insertContentAt(position, content)
          return commands.insertContent(content)
        }
    }
  }
})
