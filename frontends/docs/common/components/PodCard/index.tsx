import React from 'react'
import { PodAvatar } from '../PodAvatar'
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
  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        <PodAvatar pod={pod} />
      </div>
      <div className={styles.content}>
        <span className={styles.name}>{pod.name}</span>
        {pod.email && <span className={styles.email}>{pod.email}</span>}
      </div>
    </div>
  )
}
