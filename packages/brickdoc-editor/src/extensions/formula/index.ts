import React from 'react'
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ContextInterface, VariableInterface } from '@brickdoc/formula'
import { FormulaBlock } from './FormulaBlock'

export interface FormulaOptions {
  formulaContextActions: {
    getFormulaContext: () => ContextInterface | null
    getVariable: (variableId: string) => VariableInterface | null | undefined
    removeVariable: (variableId: string) => void
    calculate: (
      variableId: string | undefined,
      name: string,
      input: string,
      formulaContext: ContextInterface,
      updateResult: React.Dispatch<React.SetStateAction<any>>,
      updateVariable: React.Dispatch<React.SetStateAction<VariableInterface | undefined>>,
      updateError: React.Dispatch<
        React.SetStateAction<
          | {
              type: string
              message: string
            }
          | undefined
        >
      >,
      updateValue: React.Dispatch<React.SetStateAction<string | undefined>>,
      updateDefaultName: React.Dispatch<React.SetStateAction<string>>
    ) => void
  }
}

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
        ({ commands }) => {
          const content = { type: this.name, attrs: { formula: { type: 'FORMULA', id } } }
          if (position) return commands.insertContentAt(position, content)
          return commands.insertContent(content)
        },
      setFormulaBlock:
        (position: number) =>
        ({ commands }) => {
          return commands.insertContentAt(position, { type: this.name, attrs: { isNew: true, formula: { type: 'FORMULA' } } })
        }
    }
  }
})
