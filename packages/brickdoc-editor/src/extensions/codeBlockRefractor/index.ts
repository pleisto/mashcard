import { refractor } from './refractorLanguagesBundle'
import CodeBlock, { CodeBlockOptions } from '@tiptap/extension-code-block'
import { RefractorPlugin } from './refractor-plugin'

export interface CodeBlockRefractorOptions extends CodeBlockOptions {
  refractor: any
  defaultLanguage: string
}

export const CodeBlockRefractor = CodeBlock.extend<CodeBlockRefractorOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      refractor,
      defaultLanguage: 'typescript'
    }
  },

  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() ?? []),
      RefractorPlugin({
        name: this.name,
        refractor: this.options.refractor,
        defaultLanguage: this.options.defaultLanguage
      })
    ]
  }
})
