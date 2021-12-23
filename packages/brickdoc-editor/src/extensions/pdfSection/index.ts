import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { PdfSection } from './PdfSection'

const DEFAULT_WIDTH = 700
const DEFAULT_HEIGHT = 551

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pdfSection: {
      /**
       * Set a pdf section
       */
      setPdfSection: (position: number) => ReturnType
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PdfSectionOptions {}

export const PdfSectionExtension = Node.create<PdfSectionOptions>({
  name: 'pdfSection',

  group: 'block',

  selectable: false,

  allowGapCursor: false,

  addAttributes() {
    return {
      attachment: {
        default: {
          type: 'ATTACHMENT',
          width: DEFAULT_WIDTH,
          height: DEFAULT_HEIGHT
        }
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
        (position: number) =>
        ({ commands }) => {
          return commands.insertContentAt(position, { type: this.name })
        }
    }
  }
})
