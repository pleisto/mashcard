import { mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { createBlock } from '../../common'
import { FormulaBlock } from '../../../components/blockViews'
import { meta } from './meta'

export interface FormulaOptions {}
export interface FormulaAttributes {
  // TODO: add attributes types
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    formula: {
      setFormula: (id: string) => ReturnType
      setFormulaBlock: () => ReturnType
      insertFormulaBlock: (position?: number) => ReturnType
      toggleFormula: () => ReturnType
    }
  }
}

export const Formula = createBlock<FormulaOptions, FormulaAttributes>({
  name: meta.name,

  group: 'inline',

  content: '',

  inline: true,

  selectable: false,

  addAttributes() {
    return {
      isNew: {
        default: false
      },
      formula: {
        default: {
          type: 'FORMULA'
        }
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'formula-block'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['formula-block', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(FormulaBlock)
  },

  addCommands() {
    return {
      setFormula:
        id =>
        ({ chain }) => {
          const content = { type: this.name, attrs: { formula: { type: 'FORMULA', id } } }
          return chain().insertBlockAt(content).run()
        },
      setFormulaBlock:
        () =>
        ({ chain }) => {
          const content = {
            type: this.name,
            attrs: { isNew: true, formula: { type: 'FORMULA' } }
          }
          return chain().insertBlockAt(content).run()
        },
      insertFormulaBlock:
        position =>
        ({ chain }) => {
          const content = {
            type: this.name,
            attrs: { isNew: true, formula: { type: 'FORMULA' } }
          }
          return chain().insertBlockAt(content, position).run()
        },
      toggleFormula:
        () =>
        ({ commands, chain }) => {
          if (this.editor.isActive(this.name)) {
            return commands.setNode('text')
          } else {
            const content = {
              type: this.name,
              attrs: { isNew: true, formula: { type: 'FORMULA' } }
            }
            return chain().insertBlockAt(content).run()
          }
        }
    }
  }
})
