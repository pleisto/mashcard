import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ImageBlock, ImageSectionAttributes } from './ImageBlock'
import { insertBlockAt } from '../../helpers/commands'
import { ExtensionBaseOptions } from '../baseOptions'

export type { ImageSectionAttributes }

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageSection: {
      /**
       * Set a image section
       */
      setImageSection: (position?: number, file?: File) => ReturnType
    }
  }
}

export interface ImageSectionOptions extends ExtensionBaseOptions {}

export const ImageSectionExtension = Node.create<ImageSectionOptions>({
  name: 'imageSection',

  group: 'block',

  atom: true,

  selectable: false,

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
      setImageSection:
        (position?: number, defaultFile?: File) =>
        ({ chain }) => {
          const content = { type: this.name, attrs: { defaultFile, isNew: true } }
          return insertBlockAt(content, chain, position)
        }
    }
  }
})
