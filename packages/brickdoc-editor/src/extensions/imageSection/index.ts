import type { DashboardPluginOptions } from '@brickdoc/uploader'
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ImageSection } from './ImageSection'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageSection: {
      /**
       * Set a image section
       */
      setImageSection: () => ReturnType
    }
  }
}

const DEFAULT_WIDTH = 700

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
      width: {
        default: DEFAULT_WIDTH
      },
      url: {
        default: null
      },
      aspectRatio: {
        default: null
      },
      blobKey: {
        default: null
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
