import { Node, mergeAttributes, Content } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Embedtype } from '@brickdoc/schema'
import { EmbedBlock } from '../../components'
import { name } from './name'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    embedBlock: {
      /**
       * Set an embedBlock
       */
      setEmbedBlock: (embedType: Embedtype, defaultFile?: File, postion?: number) => ReturnType
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmbedBlockOptions {}

export const EmbedBlockExtension = Node.create<EmbedBlockOptions>({
  name,

  group: 'block',

  selectable: false,

  draggable: true,

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
        (embedType, defaultFile, position) =>
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
          return chain().insertBlockAt(content, position).run()
        }
    }
  }
})
