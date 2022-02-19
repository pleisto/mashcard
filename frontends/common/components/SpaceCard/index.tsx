import React from 'react'
import { SpaceAvatar } from '../SpaceAvatar'
import styles from './index.module.less'

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
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space, label }) => {
  const extra = label !== false && (label ?? (space.personal ? space.email : `@${space.domain}`))
  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        <SpaceAvatar space={space} size="sm" />
      </div>
      <div className={styles.content}>
        <span className={styles.name}>{space.name}</span>
        {extra && <span className={styles.email}>{extra}</span>}
      </div>
    </div>
  )
}
