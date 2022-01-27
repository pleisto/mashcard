import React from 'react'
import { PodAvatar } from '../PodAvatar'
import styles from './index.module.less'

export interface PodType {
  name?: string | null | undefined
  webid: string
  email?: string | null | undefined
  avatarData?: { __typename?: 'avatar'; url: string } | null | undefined
  personal?: boolean
}

interface PodCardProps {
  pod: PodType
  label?: JSX.Element | string | false
}

export const PodCard: React.FC<PodCardProps> = ({ pod, label }) => {
  const extra = label !== false && (label ?? (pod.personal ? pod.email : `@${pod.webid}`))
  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        <PodAvatar pod={pod} size="sm" />
      </div>
      <div className={styles.content}>
        <span className={styles.name}>{pod.name}</span>
        {extra && <span className={styles.email}>{extra}</span>}
      </div>
    </div>
  )
}
