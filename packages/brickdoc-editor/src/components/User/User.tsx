import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { Avatar } from '@brickdoc/design-system'
import { isEmpty } from '@brickdoc/active-support'
import { BlockContainer } from '../BlockContainer'
import { EditorContext } from '../../context/EditorContext'
import './User.less'

export interface UserProps extends NodeViewProps {}

export interface UserRenderProps {
  attributes: {
    people?: {
      name?: string
      domain?: string
      avatarUrl?: string
    }
  }
}

export const UserRender: React.FC<UserRenderProps> = ({ attributes }) => {
  const { name, domain, avatarUrl } = attributes.people ?? {}
  const { t } = React.useContext(EditorContext)
  return (
    <span>
      <Avatar
        size="sm"
        initials={name ?? domain}
        src={isEmpty(avatarUrl) ? undefined : avatarUrl}
        className="brickdoc-user-block-avatar"
      />
      <span className="brickdoc-user-block-name">{isEmpty(name) ? t('user_block.anonymous') : name}</span>
    </span>
  )
}

export const User: React.FC<UserProps> = ({ node }) => {
  return (
    <BlockContainer inline={true}>
      <UserRender attributes={node.attrs} />
    </BlockContainer>
  )
}
