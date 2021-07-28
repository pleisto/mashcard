import { DashboardPluginOptions } from '@brickdoc/uploader/dist/src/Dashboard/plugin'
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

export interface ImageSectionOptions {
  prepareFileUpload: DashboardPluginOptions['prepareFileUpload']
}

export const ImageSectionExtension = Node.create<ImageSectionOptions>({
  name: 'imageSection',

  defaultOptions: {
    prepareFileUpload: () => {
      throw new Error('You need configure prepareFileUpload if you want to enable ImageSection')
    }
  },

  group: 'block',

  atom: true,

  selectable: false,

  addAttributes() {
    return {
      width: null,
      url: null,
      aspectRatio: null
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
