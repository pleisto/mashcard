import { BlockViewProps, ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: 'tocBlock',
  extensionType: 'block'
}

export interface TocOptions {}
export interface TocAttributes {}

export interface TocViewProps extends BlockViewProps<TocOptions, TocAttributes> {}
