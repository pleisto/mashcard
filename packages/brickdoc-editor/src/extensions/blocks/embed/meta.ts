import { Embedtype } from '@brickdoc/schema'
import { BlockViewProps, ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: 'embedBlock',
  extensionType: 'block'
}

export interface EmbedOptions {}

export type EmbedViewMode = 'link' | 'preview' | 'bookmark'
export interface EmbedAttributes {
  embedMeta: {
    type: 'EmbedMeta'
    embedType: Embedtype
  }
  defaultFile?: File | null
  link: {
    type: 'LINK'
    key?: string
    title?: string | null
    description?: string | null
    cover?: string | null
    icon?: string | null
    mode?: EmbedViewMode
  }
  image: {
    type: 'IMAGE'
    key?: string
    source?: 'EXTERNAL' | 'ORIGIN'
  }
  attachment: {
    name?: string
    key?: string
    contentType?: string | null
    type: 'ATTACHMENT'
    source?: 'EXTERNAL' | 'ORIGIN'
    mode?: EmbedViewMode
    size?: number
  }
}

export interface EmbedViewProps extends BlockViewProps<EmbedOptions, EmbedAttributes> {}
