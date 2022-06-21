import Paragraph, { ParagraphOptions as TiptapParagraphOptions } from '@tiptap/extension-paragraph'
import { BlockViewProps, ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: Paragraph.name,
  extensionType: 'block'
}

export interface ParagraphOptions extends TiptapParagraphOptions {
  native?: boolean
}

export interface ParagraphAttributes {}

export interface ParagraphViewProps extends BlockViewProps<ParagraphOptions, ParagraphAttributes> {}
