import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { Tooltip } from '@brickdoc/design-system'
import React from 'react'
import { PodAvatar } from '@/common/components/PodAvatar'

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

  return <>{avatars}</>
}
