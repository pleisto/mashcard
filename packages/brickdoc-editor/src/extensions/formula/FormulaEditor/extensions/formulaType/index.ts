import { JSONContent, Mark, mergeAttributes } from '@tiptap/core'
import { SetDocAttrStep } from '../../../../sync/SetDocAttrStep'

export interface FormulaTypeOptions {
  HTMLAttributes: Record<string, any>
  editable: boolean
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    formulaType: {
      setDocAttrs: (newAttrs: Record<string, any>) => ReturnType
      replaceRoot: (content: JSONContent) => ReturnType
    }
  }
}

// TODO refactor this
const CODE_STYLES: Record<string, string> = {
  NullLiteral: '#5E35B1',
  BooleanLiteral: '#2CAD94',
  NumberLiteral: '#39b3e8',
  StringLiteral: '#AD1457',
  Column: '#2C5BFF',
  Spreadsheet: '#2C5BFF',
  Function: '#FB8C00',
  Variable: '#AD1457',
  Block: '#2C5BFF'
}

export const FormulaTypeExtension = Mark.create<FormulaTypeOptions>({
  name: 'FormulaType',

  addOptions() {
    return {
      editable: true,
      HTMLAttributes: {}
    }
  },

  addAttributes() {
    return {
      code: {
        default: null,
        parseHTML: element => element.getAttribute('data-code'),
        renderHTML: attributes => {
          if (!attributes.code) {
            return {}
          }

          const color = CODE_STYLES[attributes.code]

          if (!color) {
            return {
              'data-code': attributes.code
            }
          }

          return {
            'data-code': attributes.code,
            style: `color: ${color}`
          }
        }
      },
      error: {
        default: null,
        parseHTML: element => element.getAttribute('data-error'),
        renderHTML: attributes => {
          if (!attributes.error) {
            return {}
          }

          return {
            'data-error': attributes.error,
            // TODO refactor this
            style: 'text-decoration: underline; text-decoration-color: #D43730;'
          }
        }
      },
      type: {
        default: null,
        parseHTML: element => element.getAttribute('data-type'),
        renderHTML: attributes => {
          if (!attributes.type) {
            return {}
          }

          return {
            'data-type': attributes.type
          }
        }
      },
      display: {
        default: null,
        parseHTML: element => element.getAttribute('data-display'),
        renderHTML: attributes => {
          if (!attributes.display) {
            return {}
          }

          return {
            'data-display': attributes.display
          }
        }
      },
      value: {
        default: null,
        parseHTML: element => element.getAttribute('data-value'),
        renderHTML: attributes => {
          if (!attributes.value) {
            return {}
          }

          return {
            'data-value': attributes.value
          }
        }
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'mark'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
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
