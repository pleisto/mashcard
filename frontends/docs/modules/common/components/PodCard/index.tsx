import { Avatar, Col, Row } from '@brickdoc/design-system'
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

  const titleData = pod.email ? (
    <>
      <span className={styles.bold}>{pod.name}</span>
      <br />
      {pod.email}
    </>
  ) : (
    <span className={styles.bold}>{pod.name}</span>
  )

  return (
    <Row>
      <Col span={4} className={styles.center}>
        {avatar}
      </Col>
      <Col span={24} className={styles.center}>
        {titleData}
      </Col>
    </Row>
  )
}
