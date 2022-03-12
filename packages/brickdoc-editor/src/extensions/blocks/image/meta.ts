import { BlockViewProps, ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: 'imageBlock',
  extensionType: 'block'
}

export interface ImageOptions {}
export interface ImageAttributes {
  defaultFile?: File | null
  isNew?: boolean
  image: {
    type: 'IMAGE'
    source?: 'EXTERNAL' | 'ORIGIN'
  }
}

export interface ImageViewProps extends BlockViewProps<ImageOptions, ImageAttributes> {}
