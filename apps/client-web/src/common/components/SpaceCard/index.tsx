import React from 'react'
import { SpaceAvatar } from '../SpaceAvatar'
import * as Root from './index.style'
/* import styles from './index.module.less' */

export interface SpaceType {
  name?: string | null | undefined
  domain: string
  email?: string | null | undefined
  avatarData?:
    | { __typename?: 'avatar'; url: string }
    | { __typename: 'avatarComp'; comp: React.ReactElement }
    | null
    | undefined
  personal?: boolean
}

interface SpaceCardProps {
  space: SpaceType
  aliasName?: string | null
  label?: JSX.Element | string | false
  size?: 'sm' | 'md' | 'xs' | 'xxs'
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space, label, aliasName, size = 'md' }) => {
  const extra = label !== false && (label ?? (space.personal ? space.email : `@${space.domain}`))
  return (
    <Root.Card size={size}>
      <Root.AvatarWrapper>
        <SpaceAvatar className="avatar" space={space} size={size} />
      </Root.AvatarWrapper>
      <Root.Content>
        <Root.Name>{aliasName ?? space.name}</Root.Name>
        {extra && size === 'md' && <Root.Email>{extra}</Root.Email>}
      </Root.Content>
    </Root.Card>
  )
}
