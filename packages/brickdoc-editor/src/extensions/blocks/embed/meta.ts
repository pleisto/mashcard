import { Embedtype } from '@brickdoc/schema'
import { BlockViewProps, ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: 'embedBlock',
  extensionType: 'block'
}

export interface EmbedOptions {}
export interface EmbedAttributes {
  embedMeta: {
    type: 'EmbedMeta'
    embedType: Embedtype
  }
  defaultFile?: File | null
  link: {
    type: 'LINK'
    key?: string
    title?: string
    description?: string
    cover?: string
  }
  image: {
    type: 'IMAGE'
    key?: string
    source?: 'EXTERNAL' | 'ORIGIN'
  }
  attachment: {
    name?: string
    key?: string
    contentType?: string
    type: 'ATTACHMENT'
    source?: 'EXTERNAL' | 'ORIGIN'
    mode?: 'link' | 'preview' | undefined
  }
}

export interface EmbedViewProps extends BlockViewProps<EmbedOptions, EmbedAttributes> {}
