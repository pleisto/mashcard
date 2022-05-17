import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { Dropdown, Tooltip, Menu } from '@brickdoc/design-system'
import React from 'react'
import { Avatar } from './index.style'

interface CollaboratorsMenuProps {
  docMeta: NonNullDocMeta
}

const limit = 5

export const CollaboratorsMenu: React.FC<CollaboratorsMenuProps> = ({ docMeta }) => {
  if (!docMeta.collaborators.length) {
    return <></>
  }

  const hasMore = docMeta.collaborators.length > limit

  const avatars = docMeta.collaborators.slice(0, hasMore ? limit - 1 : limit).map((space, i) => (
    <Tooltip title={space.domain} key={i}>
      <span>
        <Avatar size={24} space={space} />
      </span>
    </Tooltip>
  ))

  const menu = (
    <Menu>
      {docMeta.collaborators.slice(limit - 1).map(space => (
        <Menu.Item
          icon={<Avatar size={24} space={space} />}
          key={space.domain}
          itemKey={space.domain}
          label={space.domain}
        />
      ))}
    </Menu>
  )

  const moreAvatars = hasMore ? (
    <Dropdown placement="bottomStart" overlay={menu} trigger="hover" key="extra">
      <span>
        <Avatar
          isMore
          size={24}
          space={{
            domain: String(docMeta.collaborators.length - limit + 1)
          }}
        />
      </span>
    </Dropdown>
  ) : null

  return (
    <>
      {avatars}
      {moreAvatars}
    </>
  )
}
