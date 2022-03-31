import { attrsToColorType, CodeFragment } from '@brickdoc/formula'
import { JSONContent, mergeAttributes } from '@tiptap/core'
import { FORMULA_COLORS } from '../../../helpers'
import { SetDocAttrStep } from '../../extensions/sync/SetDocAttrStep'
import { meta } from './meta'
import { createMark } from '../../common'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    formulaType: {
      setDocAttrs: (newAttrs: Record<string, any>) => ReturnType
      replaceRoot: (content: JSONContent) => ReturnType
    }
  }
}

export const FORMULA_CLASS_NAME = 'brickdoc-formula-mark'

export interface FormulaTypeOptions {}
export type FormulaTypeAttributes = Omit<CodeFragment, 'hide'>

export const FormulaType = createMark<FormulaTypeOptions, FormulaTypeAttributes>({
  name: meta.name,

  addAttributes() {
    return {
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
            'data-renderText': JSON.stringify(attributes.renderText)
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
            'data-attrs': JSON.stringify(attributes.attrs)
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
  },

  parseHTML() {
    return [
      {
        tag: 'mark'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes({ class: FORMULA_CLASS_NAME }, HTMLAttributes), 0]
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
