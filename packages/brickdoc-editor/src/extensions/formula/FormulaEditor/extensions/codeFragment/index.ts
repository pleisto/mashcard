import { Node, mergeAttributes, JSONContent } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { SetDocAttrStep } from '../../../../sync/SetDocAttrStep'
import { CodeFragment } from './CodeFragment/CodeFragment'
import { CodeFragment as CodeFragmentType } from '@brickdoc/formula'

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

  addAttributes() {
    const defaultAttr: { [key in keyof (CodeFragmentType & {blockId: string })]: { default: any } } = {
      meta: { default: {} },
      blockId: {default: ''},
      code: { default: '' },
      name: { default: '' },
      spaceAfter: { default: false },
      spaceBefore: { default: false },
      type: { default: 'any' },
      errors: { default: [] }
    }
    return defaultAttr
  },

  parseHTML() {
    return [
      {
        tag: 'code-fragment'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['code-fragment', mergeAttributes(HTMLAttributes)]
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
