import { CodeBlock, CodeBlockOptions as TiptapCodeBlockOptions } from '@tiptap/extension-code-block'
import { BlockViewProps, ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: CodeBlock.name,
  extensionType: 'block'
}

export interface CodeBlockOptions extends TiptapCodeBlockOptions {
  refractor: any
  defaultLanguage: string
}

export interface CodeBlockAttributes {
  language?: string | null
  autoWrap?: boolean | null
}

export interface CodeBlockViewProps extends BlockViewProps<CodeBlockOptions, CodeBlockAttributes> {}
