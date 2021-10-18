import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { Avatar, Tooltip } from '@brickdoc/design-system'
import React from 'react'
import { PodAvatar } from '../PodAvatar'

interface CollaboratorsMenuProps {
  docMeta: NonNullDocMeta
}

export const CollaboratorsMenu: React.FC<CollaboratorsMenuProps> = ({ docMeta }) => {
  if (!docMeta.collaborators.length) {
    return <></>
  }

  const avatars = docMeta.collaborators.map((pod, i) => (
    <Tooltip title={pod.webid} key={i}>
      <PodAvatar pod={pod} />
    </Tooltip>
  ))

  return <Avatar.Group maxCount={4}>{avatars}</Avatar.Group>
}
