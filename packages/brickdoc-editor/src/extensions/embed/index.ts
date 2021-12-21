import { Node, mergeAttributes, Content } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { EmbedBlock } from './EmbedBlock'
import { insertBlockAt } from '../../helpers/commands'
import { ExtensionBaseOptions } from '../baseOptions'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    embedBlock: {
      /**
       * Set a embedBlock
       */
      setEmbedBlock: (position?: number) => ReturnType
    }
  }
}

export interface EmbedBlockOptions extends ExtensionBaseOptions {}

export const EmbedBlockExtension = Node.create<EmbedBlockOptions>({
  name: 'embedBlock',

  group: 'block',

  selectable: false,

  allowGapCursor: false,

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
        tag: 'embed-block'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['embed-block', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(EmbedBlock)
  },

  addCommands() {
    return {
      setEmbedBlock:
        (position?: number) =>
        ({ chain }) => {
          const content: Content = { type: this.name, attrs: { isNew: true } }
          return insertBlockAt(content, chain, position)
        }
    }
  }
})
