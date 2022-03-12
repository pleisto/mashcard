import { refractor } from './refractorLanguagesBundle'
import { CodeBlock as TiptapCodeBlock } from '@tiptap/extension-code-block'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { RefractorPlugin } from './refractor-plugin'
import { CodeBlockView } from '../../../components/blockViews'
import { CodeBlockOptions } from './meta'

export const CodeBlock = TiptapCodeBlock.extend<CodeBlockOptions>({
  draggable: true,

  addOptions() {
    return {
      ...this.parent?.(),
      refractor,
      defaultLanguage: 'typescript'
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockView)
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
