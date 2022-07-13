import { FC } from 'react'
import { BlockSelector, BlockSelectorProps } from '../../ui/BlockSelector'

export interface SlashMenuProps extends BlockSelectorProps {}

export const SlashMenu: FC<SlashMenuProps> = props => {
  return <BlockSelector {...props} />
}
