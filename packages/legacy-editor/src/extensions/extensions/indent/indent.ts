import { createExtension } from '../../common'
import { isAnyListType } from '../brickList'
import { meta } from './meta'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType
      deindent: () => ReturnType
    }
  }
}

export interface IndentOptions {}
export interface IndentAttributes {}

export const Indent = createExtension<IndentOptions, IndentAttributes>({
  name: meta.name,

  addCommands() {
    return {
      indent:
        () =>
        ({ editor, tr, state, dispatch }) => {
          if (isAnyListType(editor)) {
            return false
          }
          const lineText = state.doc.textBetween(state.selection.$from.before(), state.selection.$from.pos)
          if (lineText.match(/^[\t]*$/)) {
            tr.insertText('\t')
            if (tr.docChanged) {
              // eslint-disable-next-line no-unused-expressions
              dispatch?.(tr)?.scrollIntoView()
            }
          }
          return true
        },
      deindent:
        () =>
        ({ editor, tr, state, dispatch }) => {
          if (isAnyListType(editor)) {
            return false
          }
          const { selection } = state
          const lineText = state.doc.textBetween(selection.$from.before(), selection.$from.pos)
          if (lineText.match(/^[\t]*$/)) {
            tr.delete(selection.from - 1, selection.from)
            if (tr.docChanged) {
              // eslint-disable-next-line no-unused-expressions
              dispatch?.(tr)?.scrollIntoView()
            }
          }
          return true
        }
    }
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.indent(),
      'Shift-Tab': () => this.editor.commands.deindent()
    }
  }
})
