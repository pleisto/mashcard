// ref: https://www.tiptap.dev/experiments/font-color
import { Extension } from '@tiptap/core'
import '@tiptap/extension-text-style'

export interface FontColorOptions {
  types: string[]
}

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

export const FontColorExtension = Extension.create<FontColorOptions>({
  name: 'fontColor',

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
