import type { DashboardPluginOptions } from '@brickdoc/uploader'
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { PdfSection } from './PdfSection'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pdfSection: {
      /**
       * Set a pdf section
       */
      setPdfSection: () => ReturnType
    }
  }
}

const DEFAULT_WIDTH = 700
const DEFAULT_HEIGHT = 551

export interface PdfSectionOptions {
  prepareFileUpload: DashboardPluginOptions['prepareFileUpload']
}

export const PdfSectionExtension = Node.create<PdfSectionOptions>({
  name: 'pdfSection',

  defaultOptions: {
    prepareFileUpload: () => {
      throw new Error('You need configure prepareFileUpload if you want to enable PdfSection')
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
      height: {
        default: DEFAULT_HEIGHT
      },
      url: {
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
        tag: 'pdf-section'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['pdf-section', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(PdfSection)
  },

  addCommands() {
    return {
      setPdfSection:
        () =>
        ({ commands }) => {
          return commands.replace(this.name)
        }
    }
  }
})
