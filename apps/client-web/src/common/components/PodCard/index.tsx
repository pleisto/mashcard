import { useSettingsI18n } from '@/routes/$domain/settings/_shared/useSettingsI18n'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import React from 'react'
import { PodAvatar } from '../PodAvatar'
import * as Root from './index.style'

export interface PodType {
  name?: string | null | undefined
  domain: string
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
  const { t } = useSettingsI18n()
  const extra = label ?? (pod.personal ? t('personal_pod_desc') : pod.domain)
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
