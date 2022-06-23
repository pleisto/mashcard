// ref: https://www.tiptap.dev/experiments/font-color
import '@tiptap/extension-text-style'
import { createExtension } from '../../common'
import { meta } from './meta'

export interface FontBgColorOptions {
  types?: string[]
  // TODO: make HTMLAttributes type clear
  HTMLAttributes?: Record<string, any>
}
export interface FontBgColorAttributes {}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontBgColor: {
      /**
       * Set the font bg color
       */
      setFontBgColor: (fontBgColor: string) => ReturnType
      /**
       * Unset the font bg color
       */
      unsetFontBgColor: () => ReturnType
    }
  }
}

export const FontBgColor = createExtension<FontBgColorOptions, FontBgColorAttributes>({
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
          fontBgColor: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.fontBgColor) {
                return {}
              }

              return {
                ...this.options.HTMLAttributes,
                style: `background-color: ${attributes.fontBgColor};${this.options.HTMLAttributes?.style ?? ''}`
              }
            },
            parseHTML: element => {
              return {
                fontBgColor: element.style.backgroundColor.replace(/['"]+/g, '')
              }
            }
          }
        }
      }
    ]
  },

  addCommands() {
    return {
      setFontBgColor:
        fontBgColor =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontBgColor }).run()
        },
      unsetFontBgColor:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontBgColor: null }).removeEmptyTextStyle().run()
        }
    }
  }
})
