import type { DashboardPluginOptions } from '@brickdoc/uploader'
import { Node as ProsemirrorNode } from 'prosemirror-model'
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ImageSection, ImageSectionAttributes } from './ImageSection'

export type { ImageSectionAttributes }

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

export interface ImageSectionOptions {
  prepareFileUpload: DashboardPluginOptions['prepareFileUpload']
  fetchUnsplashImages: DashboardPluginOptions['fetchUnsplashImages']
  getImageUrl?: (node: ProsemirrorNode) => string | undefined
}

export const ImageSectionExtension = Node.create<ImageSectionOptions>({
  name: 'imageSection',

  defaultOptions: {
    prepareFileUpload: () => {
      throw new Error('You need configure prepareFileUpload if you want to enable ImageSection')
    },
    fetchUnsplashImages: () => {
      throw new Error('You need configure fetchUnsplashImages if you want to enable ImageSection')
    }
  },

  group: 'block',

  atom: true,

  selectable: false,

  addAttributes() {
    return {
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
