import { Avatar } from '@brickdoc/design-system'
import React from 'react'
import styles from './index.module.less'

export interface PodType {
  name?: string | null | undefined
  webid: string
  email?: string | null | undefined
  avatarData?: { __typename?: 'avatar'; url: string } | null | undefined
}

interface PodCardProps {
  pod: PodType
}

export const PodCard: React.FC<PodCardProps> = ({ pod }) => {
  const avatar = pod.avatarData?.url ? <Avatar src={pod.avatarData.url} /> : <Avatar>{pod.webid}</Avatar>

  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>{avatar}</div>
      <div className={styles.content}>
        <span className={styles.name}>{pod.name}</span>
        {pod.email && <span className={styles.email}>{pod.email}</span>}
      </div>
    </div>
  )
}
