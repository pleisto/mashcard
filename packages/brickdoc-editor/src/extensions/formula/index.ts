import React from 'react'
import { Node, mergeAttributes, JSONContent } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { CodeFragment, Completion, ContextInterface, ErrorMessage, VariableInterface } from '@brickdoc/formula'
import { FormulaBlock } from './FormulaBlock'

interface CalculateOptions {
  variable: VariableInterface | undefined
  name: string
  input: string
  codeFragmentsToJSONContent: (codeFragments: CodeFragment[] | undefined) => JSONContent | undefined
  formulaContext: ContextInterface
  updateVariable: React.Dispatch<React.SetStateAction<VariableInterface | undefined>> | undefined
  updateError: React.Dispatch<React.SetStateAction<ErrorMessage | undefined>>
  updateInput: React.Dispatch<React.SetStateAction<string | undefined>>
  updateCompletions: React.Dispatch<React.SetStateAction<Completion[]>>
  updateActiveCompletion: React.Dispatch<React.SetStateAction<Completion | undefined>>
  updateDefaultName: React.Dispatch<React.SetStateAction<string>>
  updateContent: React.Dispatch<React.SetStateAction<JSONContent | undefined>>
}

export interface FormulaOptions {
  formulaContextActions: {
    getFormulaContext: () => ContextInterface | null
    getVariable: (variableId: string) => VariableInterface | undefined
    removeVariable: (variableId: string) => void
    calculate: (options: CalculateOptions) => void
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
          return commands.insertContentAt(position + 1, {
            type: this.name,
            attrs: { isNew: true, formula: { type: 'FORMULA' } }
          })
        }
    }
  }
})
