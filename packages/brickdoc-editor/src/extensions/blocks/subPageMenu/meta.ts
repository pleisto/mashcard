import { ReactElement } from 'react'
import { BlockViewProps, ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: 'subPageMenuBlock',
  extensionType: 'block'
}

export interface SubPageMenuOptions {
  // TODO: do not pass in the render function to render a subPage menu
  renderView?: () => ReactElement
}
export interface SubPageMenuAttributes {}

export interface SubPageMenuViewProps extends BlockViewProps<SubPageMenuOptions, SubPageMenuAttributes> {}
