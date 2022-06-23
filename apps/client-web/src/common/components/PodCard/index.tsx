import { TEST_ID_ENUM } from '@mashcard/test-helper'
import React from 'react'
import { PodAvatar } from '../PodAvatar'
import * as Root from './index.style'

export interface PodType {
  name?: string | null | undefined
  domain: string
  email?: string | null | undefined
  avatarData?:
    | { __typename?: 'Avatar'; url: string }
    | { __typename: 'AvatarComp'; comp: React.ReactElement }
    | null
    | undefined
  personal?: boolean
}

interface PodCardProps {
  pod: PodType
  aliasName?: string | null
  label?: JSX.Element | string | false
  size?: 'sm' | 'md' | 'xs' | 'xxs'
}

export const PodCard: React.FC<PodCardProps> = ({ pod, label, aliasName, size = 'md' }) => {
  const extra = label !== false && (label ?? (pod.personal ? pod.email : `@${pod.domain}`))
  return (
    <Root.Card size={size} data-testid={TEST_ID_ENUM.layout.sidebar.podSelect.id}>
      <Root.AvatarWrapper>
        <PodAvatar className="avatar" pod={pod} size={size} />
      </Root.AvatarWrapper>
      <Root.Content>
        <Root.Name>{aliasName ?? pod.name}</Root.Name>
        {extra && size === 'md' && <Root.Email>{extra}</Root.Email>}
      </Root.Content>
    </Root.Card>
  )
}
