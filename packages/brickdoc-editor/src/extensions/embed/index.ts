import { Node, mergeAttributes, Content } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Embedtype } from '@brickdoc/schema'
import { EmbedBlock } from '../../components'
import { insertBlockAt } from '../../helpers/commands'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    embedBlock: {
      /**
       * Set a embedBlock
       */
      setEmbedBlock: (embedType: Embedtype, defaultFile?: File) => ReturnType
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmbedBlockOptions {}

export const EmbedBlockExtension = Node.create<EmbedBlockOptions>({
  name: 'embedBlock',

  group: 'block',

  selectable: false,

  allowGapCursor: false,

  addAttributes() {
    return {
      embedMeta: {
        default: {
          type: 'EmbedMeta'
        }
      },
      isNew: {
        default: false
      },
      defaultFile: {
        default: null
      },
      link: {
        default: {
          type: 'LINK'
        }
      },
      image: {
        default: {
          type: 'IMAGE'
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
        (embedType, defaultFile) =>
        ({ chain }) => {
          const content: Content = {
            type: this.name,
            attrs: {
              isNew: true,
              defaultFile,
              embedMeta: {
                embedType
              }
            }
          }
          return insertBlockAt(content, chain)
        }
    }
  }
})
