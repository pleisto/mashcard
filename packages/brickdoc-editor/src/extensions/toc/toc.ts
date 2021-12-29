import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { TocBlock } from '../../components'
import { insertBlockAt } from '../../helpers/commands'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tocBlock: {
      /**
       * Set a toc block
       */
      setTocBlock: () => ReturnType
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TocBlockOptions {}

export const TocBlockExtension = Node.create<TocBlockOptions>({
  name: 'tocBlock',

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
        () =>
        ({ chain }) => {
          return insertBlockAt({ type: this.name }, chain)
        }
    }
  }
})
