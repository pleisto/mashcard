import React from 'react'
import { SpaceAvatar } from '../SpaceAvatar'
import * as Root from './index.style'
/* import styles from './index.module.less' */

export interface SpaceType {
  name?: string | null | undefined
  domain: string
  email?: string | null | undefined
  avatarData?: { __typename?: 'avatar'; url: string } | null | undefined
  personal?: boolean
}

interface SpaceCardProps {
  space: SpaceType
  label?: JSX.Element | string | false
  size?: 'sm' | 'md'
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space, label, size = 'md' }) => {
  const extra = label !== false && (label ?? (space.personal ? space.email : `@${space.domain}`))
  return (
    <Root.Card size={size}>
      <Root.AvatarWrapper>
        <SpaceAvatar space={space} size={size} />
      </Root.AvatarWrapper>
      <Root.Content>
        <Root.Name>{space.name}</Root.Name>
        {extra && size !== 'sm' && <Root.Email>{extra}</Root.Email>}
      </Root.Content>
    </Root.Card>
  )
}
