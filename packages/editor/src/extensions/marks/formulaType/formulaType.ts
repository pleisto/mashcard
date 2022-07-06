import { attrsToColorType, CodeFragment } from '@mashcard/formula'
import { JSONContent, mergeAttributes } from '@tiptap/core'
import { SetDocAttrStep } from '../../extensions/sync/SetDocAttrStep'
import { meta } from './meta'
import { createMark } from '../../common'
import { formulaCodeStyle, FORMULA_CODE_ERROR_STYLE } from '../../../components/ui/Formula'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    formulaType: {
      setDocAttrs: (newAttrs: Record<string, any>) => ReturnType
      replaceRoot: (content: JSONContent) => ReturnType
    }
  }
}

export const FORMULA_CLASS_NAME = 'mashcard-formula-mark'

export interface FormulaTypeOptions {}
export type FormulaTypeAttributes = CodeFragment

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

          const style = formulaCodeStyle(attrsToColorType(attributes as CodeFragment))
          return { 'data-code': attributes.code, ...(style ? { style } : {}) }
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
            style: FORMULA_CODE_ERROR_STYLE
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
      attrs: {
        default: null,
        keepOnSplit: true,
        parseHTML: element => {
          const attrs = element.getAttribute('data-attrs')
          return attrs && JSON.parse(attrs)
        },
        renderHTML: attributes => {
          if (!attributes.attrs) {
            return {}
          }

          return {
            'data-attrs': JSON.stringify(attributes.attrs)
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
