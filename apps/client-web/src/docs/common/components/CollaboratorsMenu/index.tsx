import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { Tooltip } from '@brickdoc/design-system'
import React from 'react'
import { SpaceAvatar } from '@/common/components/SpaceAvatar'

interface CollaboratorsMenuProps {
  docMeta: NonNullDocMeta
}

export const CollaboratorsMenu: React.FC<CollaboratorsMenuProps> = ({ docMeta }) => {
  if (!docMeta.collaborators.length) {
    return <></>
  }

  const avatars = docMeta.collaborators.map((space, i) => (
    <Tooltip title={space.domain} key={i}>
      <SpaceAvatar space={space} />
    </Tooltip>
  ))

  return <>{avatars}</>
}
