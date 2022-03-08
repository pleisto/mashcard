import { attrsToColorType, CodeFragment } from '@brickdoc/formula'
import { Attribute, JSONContent, Mark, mergeAttributes } from '@tiptap/core'
import { FORMULA_COLORS } from '../../../../../helpers/color'
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

export const FormulaTypeExtension = Mark.create<FormulaTypeOptions>({
  name: 'FormulaType',

  addOptions() {
    return {
      editable: true,
      HTMLAttributes: {}
    }
  },

  addAttributes() {
    const attrs: Record<Exclude<keyof CodeFragment, 'hide'>, Attribute> = {
      code: {
        default: null,
        keepOnSplit: true,
        parseHTML: element => element.getAttribute('data-code'),
        renderHTML: attributes => {
          if (!attributes.code) {
            return {}
          }

          const colorMeta = FORMULA_COLORS[attrsToColorType(attributes as CodeFragment)]

          if (!colorMeta) {
            return {
              'data-code': attributes.code,
              style: 'font-family: Fira Code'
            }
          }

          return {
            'data-code': attributes.code,
            style: `color: ${colorMeta.colorMain}; font-family: Fira Code;`
          }
        }
      },
      errors: {
        default: [],
        keepOnSplit: true,
        parseHTML: element => element.getAttribute('data-errors'),
        renderHTML: attributes => {
          const errors = attributes.errors
          if (!errors || errors.length === 0) {
            return {}
          }

          return {
            'data-errors': attributes.errors[0].message,
            // TODO refactor this
            style: 'text-decoration: underline; text-decoration-color: #D43730;'
          }
        }
      },
      type: {
        default: null,
        keepOnSplit: true,
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
        keepOnSplit: true,
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
      renderText: {
        default: null,
        keepOnSplit: true,
        parseHTML: element => element.getAttribute('data-renderText'),
        renderHTML: attributes => {
          if (!attributes.renderText) {
            return {}
          }

          return {
            'data-renderText': attributes.renderText
          }
        }
      },
      attrs: {
        default: null,
        keepOnSplit: true,
        parseHTML: element => element.getAttribute('data-attrs'),
        renderHTML: attributes => {
          if (!attributes.attrs) {
            return {}
          }

          return {
            'data-attrs': attributes.attrs
          }
        }
      },
      value: {
        default: null,
        keepOnSplit: true,
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

    return attrs
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
