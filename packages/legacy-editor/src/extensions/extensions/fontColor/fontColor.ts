// ref: https://www.tiptap.dev/experiments/font-color
import '@tiptap/extension-text-style'
import { createExtension } from '../../common'
import { meta } from './meta'

export interface FontColorOptions {
  types: string[]
}
export interface FontColorAttributes {}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontColor: {
      /**
       * Set the font color
       */
      setFontColor: (fontColor: string) => ReturnType
      /**
       * Unset the font color
       */
      unsetFontColor: () => ReturnType
    }
  }
}

export const FontColor = createExtension<FontColorOptions, FontColorAttributes>({
  name: meta.name,

  addOptions() {
    return {
      types: ['textStyle']
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontColor: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.fontColor) {
                return {}
              }

              return {
                style: `color: ${attributes.fontColor}`
              }
            },
            parseHTML: element => {
              return {
                fontColor: element.style.color.replace(/['"]+/g, '')
              }
            }
          }
        }
      }
    ]
  },

  addCommands() {
    return {
      setFontColor:
        fontColor =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontColor }).run()
        },
      unsetFontColor:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontColor: null }).removeEmptyTextStyle().run()
        }
    }
  }
})
