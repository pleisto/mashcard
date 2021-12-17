import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ImageBlock } from './ImageBlock'
import { insertBlockAt } from '../../helpers/commands'
import { ExtensionBaseOptions } from '../baseOptions'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageSection: {
      /**
       * Set a image block
       */
      setImageBlock: (position?: number, file?: File) => ReturnType
    }
  }
}

export interface ImageBlockOptions extends ExtensionBaseOptions {}

export const ImageBlockExtension = Node.create<ImageBlockOptions>({
  name: 'imageSection',

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
        tag: 'image-section'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['image-section', mergeAttributes(HTMLAttributes)]
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
          return insertBlockAt(content, chain, position)
        }
    }
  }
})
