import { Node, mergeAttributes, Content } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { LinkBlock } from './LinkBlock'
import { insertBlockAt } from '../../helpers/commands'
import { ExtensionBaseOptions } from '../baseOptions'

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

export interface LinkBlockOptions extends ExtensionBaseOptions {}

export const LinkBlockExtension = Node.create<LinkBlockOptions>({
  name: 'linkBlock',

  group: 'block',

  atom: true,

  selectable: false,

  addAttributes() {
    return {
      isNew: {
        default: false
      },
      link: {
        default: {
          type: 'LINK'
        }
      },
      attachment: {
        default: {
          type: 'ATTACHMENT'
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
        ({ chain }) => {
          const content: Content = { type: this.name, attrs: { isNew: true } }
          return insertBlockAt(content, chain, position)
        }
    }
  }
})
