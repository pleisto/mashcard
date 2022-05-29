import { FC } from 'react'

import { useDocMeta } from '@/docs/store/DocMeta'
import { Dropdown, Tooltip, Menu } from '@brickdoc/design-system'
import { Avatar } from './index.style'

const limit = 5

export const CollaboratorsMenu: FC = () => {
  const { collaborators } = useDocMeta()
  if (!collaborators.length) {
    return <></>
  }

  const hasMore = collaborators.length > limit

  const avatars = collaborators.slice(0, hasMore ? limit - 1 : limit).map((space, i) => (
    <Tooltip title={space.domain} key={i}>
      <span>
        <Avatar size={24} space={space} />
      </span>
    </Tooltip>
  ))

  const menu = (
    <Menu>
      {collaborators.slice(limit - 1).map(space => (
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
            domain: String(collaborators.length - limit + 1)
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
