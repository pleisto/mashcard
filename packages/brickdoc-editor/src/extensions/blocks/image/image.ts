import { uuid } from '@brickdoc/active-support'
import { BlockJustCreated, BrickdocEventBus } from '@brickdoc/schema'
import { mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ImageView } from '../../../components/blockViews'
import { createBlock, createJSONAttributeHtmlParser, createJSONAttributeHtmlRender } from '../../common'
import { ImageAttributes, ImageOptions, meta } from './meta'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageBlock: {
      /**
       * Set a image block
       */
      setImageBlock: (position?: number, file?: File) => ReturnType
    }
  }
}

export const Image = createBlock<ImageOptions, ImageAttributes>({
  name: meta.name,

  group: 'block',

  selectable: false,

  draggable: true,

  allowGapCursor: false,

  addAttributes() {
    return {
      ...this.parent?.(),
      defaultFile: { default: {} },
      image: {
        default: {
          type: 'IMAGE'
        },
        parseHTML: createJSONAttributeHtmlParser('data-image'),
        renderHTML: createJSONAttributeHtmlRender('image', 'data-image')
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'image-block'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['image-block', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageView)
  },

  addCommands() {
    return {
      setImageBlock:
        (position?: number, defaultFile?: File) =>
        ({ chain }) => {
          const id = uuid()
          const content = { type: this.name, attrs: { defaultFile, uuid: id } }
          const result = chain().insertBlockAt(content, position).run()

          if (result) {
            BrickdocEventBus.dispatch(BlockJustCreated({ id }))
          }

          return result
        }
    }
  }
})
