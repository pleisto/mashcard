import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { FormulaBlock } from './FormulaBlock'
import { insertBlockAt } from '../../helpers/commands'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FormulaOptions {}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    formula: {
      setFormula: (id: string, position?: number) => ReturnType
      setFormulaBlock: (position: number) => ReturnType
    }
  }
}

export const FormulaExtension = Node.create<FormulaOptions>({
  name: 'formulaBlock',

  group: 'inline',

  inline: true,

  atom: true,

  selectable: false,

  addAttributes() {
    return {
      isNew: {
        default: false
      },
      formula: {
        default: {
          type: 'FORMULA',
          color: ''
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
        (id, position) =>
        ({ chain }) => {
          const content = { type: this.name, attrs: { formula: { type: 'FORMULA', id } } }
          return insertBlockAt(content, chain, position)
        },
      setFormulaBlock:
        (position: number) =>
        ({ chain }) => {
          const content = {
            type: this.name,
            attrs: { isNew: true, formula: { type: 'FORMULA' } }
          }
          return insertBlockAt(content, chain, position + 1)
        }
    }
  }
})
