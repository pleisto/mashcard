import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { TocBlock } from '../../components'
import { name } from './name'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tocBlock: {
      /**
       * Set a toc block
       */
      setTocBlock: (position?: number) => ReturnType
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TocBlockOptions {}

export const TocBlockExtension = Node.create<TocBlockOptions>({
  name,

  group: 'block',

  selectable: false,

  allowGapCursor: false,

  parseHTML() {
    return [
      {
        tag: 'toc-block'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['toc-block', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(TocBlock)
  },

  addCommands() {
    return {
      setTocBlock:
        position =>
        ({ chain }) => {
          return chain().insertBlockAt({ type: this.name }, position).run()
        }
    }
  }
})
