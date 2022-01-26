import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { SubPageMenuBlock } from '../../components'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    subPageMenu: {
      /**
       * Set a subPage menu block
       */
      setSubPageMenuBlock: (position?: number) => ReturnType
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SubPageMenuBlockOptions {}

export const SubPageMenuBlockExtension = Node.create<SubPageMenuBlockOptions>({
  name: 'subPageMenuBlock',

  group: 'block',

  selectable: false,

  allowGapCursor: false,

  parseHTML() {
    return [
      {
        tag: 'sub-page-menu-block'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['sub-page-menu-block', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(SubPageMenuBlock)
  },

  addCommands() {
    return {
      setSubPageMenuBlock:
        position =>
        ({ chain }) => {
          return chain().insertBlockAt({ type: this.name }, position).run()
        }
    }
  }
})
