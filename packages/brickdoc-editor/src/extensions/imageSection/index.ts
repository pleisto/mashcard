import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ImageSection } from './ImageSection'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageSection: {
      /**
       * Toggle a image section
       */
      setImageSection: () => ReturnType
    }
  }
}

export const ImageSectionExtension = Node.create({
  name: 'imageSection',

  defaultOptions: {},

  group: 'block',

  atom: true,

  selectable: false,

  addAttributes() {
    return {
      width: {},
      aspectRatio: {}
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
    return ReactNodeViewRenderer(ImageSection)
  },

  addCommands() {
    return {
      setImageSection:
        () =>
        ({ commands }) => {
          return commands.replace(this.name)
        }
    }
  }
})
