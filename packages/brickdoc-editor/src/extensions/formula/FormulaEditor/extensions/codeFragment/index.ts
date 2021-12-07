import { Node, mergeAttributes, JSONContent } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { SetDocAttrStep } from '../../../../sync/SetDocAttrStep'
import { CodeFragment } from './CodeFragment/CodeFragment'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    codeFragmentBlock: {
      setCodeFragmentBlock: () => ReturnType
      setDocAttrs: (newAttrs: Record<string, any>) => ReturnType
      replaceRoot: (content: JSONContent) => ReturnType
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CodeFragmentBlockOptions {}

export const CodeFragmentBlockExtension = Node.create<CodeFragmentBlockOptions>({
  name: 'codeFragmentBlock',

  inline: true,

  group: 'inline',

  selectable: false,

  defaultOptions: {},

  addAttributes() {
    return {
      meta: { default: {} },
      code: { default: '' },
      name: { default: '' },
      space: { default: false },
      type: { default: 'any' },
      errors: { default: [] }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'function-call'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['function-call', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeFragment)
  },

  addCommands() {
    return {
      setCodeFragmentBlock:
        () =>
        ({ chain }) => {
          return chain().insertContent(this.name).run()
        },
      setDocAttrs:
        newAttrs =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.step(new SetDocAttrStep(newAttrs))
          }
          return true
        },
      replaceRoot:
        content =>
        ({ chain, can, dispatch }) => {
          const chainedCommands = dispatch ? chain() : can().chain()
          return (
            chainedCommands
              // replaceRoot will not record in history because it is an initialization
              .setMeta('addToHistory', false)
              .setContent(content, false)
              .setDocAttrs(content.attrs ?? {})
              .run()
          )
        }
    }
  }
})
