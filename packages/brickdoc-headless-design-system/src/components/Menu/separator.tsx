import React from 'react'
import { useSeparator } from '@react-aria/separator'
import { styled, theme } from '../../themes'
import { itemSpacing } from './styles/index.style'

const SeparatorRoot = styled('li', {
  margin: `${theme.space.xxs} ${itemSpacing}`,
  borderTop: `1px solid ${theme.colors.dividerOverlayPrimary}`,
  height: 1
})

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SeparatorProps {}

export const Separator: React.FC<SeparatorProps> = () => {
  const { separatorProps } = useSeparator({
    elementType: 'li'
  })

  return <SeparatorRoot {...separatorProps} css={{}} />
}
