import { BlockViewProps, ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: 'subPageMenuBlock',
  extensionType: 'block'
}

export interface SubPageMenuOptions {}
export interface SubPageMenuAttributes {}

export interface SubPageMenuViewProps extends BlockViewProps<SubPageMenuOptions, SubPageMenuAttributes> {}
