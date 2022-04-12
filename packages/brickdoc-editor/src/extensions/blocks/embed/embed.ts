import { mergeAttributes, Content } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { BlockJustCreated, BrickdocEventBus, Embedtype } from '@brickdoc/schema'
import { EmbedView } from '../../../components/blockViews'
import { createBlock, createJSONAttributeHtmlParser, createJSONAttributeHtmlRender } from '../../common'
import { EmbedAttributes, EmbedOptions, meta } from './meta'
import { uuid } from '@brickdoc/active-support'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    embed: {
      /**
       * Set an embedBlock
       */
      setEmbedBlock: (embedType: Embedtype, defaultFile?: File, postion?: number) => ReturnType
    }
  }
}

export const Embed = createBlock<EmbedOptions, EmbedAttributes>({
  name: meta.name,

  group: 'block',

  selectable: false,

  draggable: true,

  allowGapCursor: false,

  addAttributes() {
    return {
      embedMeta: {
        default: {
          type: 'EmbedMeta'
        },
        parseHTML: createJSONAttributeHtmlParser('data-embed-meta'),
        renderHTML: createJSONAttributeHtmlRender('embedMeta', 'data-embed-meta')
      },
      defaultFile: {
        default: null
      },
      link: {
        default: {
          type: 'LINK'
        },
        parseHTML: createJSONAttributeHtmlParser('data-link'),
        renderHTML: createJSONAttributeHtmlRender('link', 'data-link')
      },
      image: {
        default: {
          type: 'IMAGE'
        },
        parseHTML: createJSONAttributeHtmlParser('data-image'),
        renderHTML: createJSONAttributeHtmlRender('image', 'data-image')
      },
      attachment: {
        default: {
          type: 'ATTACHMENT'
        },
        parseHTML: createJSONAttributeHtmlParser('data-attachment'),
        renderHTML: createJSONAttributeHtmlRender('attachment', 'data-attachment')
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
    return ReactNodeViewRenderer(EmbedView)
  },

  addCommands() {
    return {
      setEmbedBlock:
        (embedType, defaultFile, position) =>
        ({ chain }) => {
          const id = uuid()
          const content: Content = {
            type: this.name,
            attrs: {
              uuid: id,
              defaultFile,
              embedMeta: {
                embedType
              }
            }
          }
          const result = chain().insertBlockAt(content, position).run()

          if (result) {
            BrickdocEventBus.dispatch(BlockJustCreated({ id }))
          }

          return result
        }
    }
  }
})
