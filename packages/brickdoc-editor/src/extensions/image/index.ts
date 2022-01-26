import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ImageBlock } from '../../components'

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ImageBlockOptions {}

export const ImageBlockExtension = Node.create<ImageBlockOptions>({
  name: 'imageBlock',

  group: 'block',

  selectable: false,

  allowGapCursor: false,

  addAttributes() {
    return {
      ...this.parent?.(),
      defaultFile: { default: {} },
      isNew: { default: false },
      image: {
        default: {
          type: 'IMAGE'
        }
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
    return ReactNodeViewRenderer(ImageBlock)
  },

  addCommands() {
    return {
      setImageBlock:
        (position?: number, defaultFile?: File) =>
        ({ chain }) => {
          const content = { type: this.name, attrs: { defaultFile, isNew: true } }
          return chain().insertBlockAt(content, position).run()
        }
    }
  }
})
