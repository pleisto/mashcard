import { mergeAttributes, Content } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Embedtype } from '@brickdoc/schema'
import { EmbedView } from '../../../components/blockViews'
import { createBlock, createJSONAttributeHtmlParser, createJSONAttributeHtmlRender } from '../../common'
import { EmbedAttributes, EmbedOptions, meta } from './meta'

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
      isNew: {
        default: false
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
