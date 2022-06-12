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

  const avatars = collaborators.slice(0, hasMore ? limit - 1 : limit).map((pod, i) => (
    <Tooltip title={pod.domain} key={i}>
      <span>
        <Avatar size={24} pod={pod} />
      </span>
    </Tooltip>
  ))

  const menu = (
    <Menu>
      {collaborators.slice(limit - 1).map(pod => (
        <Menu.Item icon={<Avatar size={24} pod={pod} />} key={pod.domain} itemKey={pod.domain} label={pod.domain} />
      ))}
    </Menu>
  )

  const moreAvatars = hasMore ? (
    <Dropdown placement="bottomStart" overlay={menu} trigger="hover" key="extra">
      <span>
        <Avatar
          isMore
          size={24}
          pod={{
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
