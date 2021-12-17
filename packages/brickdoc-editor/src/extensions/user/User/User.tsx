import React from 'react'
import { Avatar } from '@brickdoc/design-system'
import { NodeViewRendererProps } from '@tiptap/react'
import { BlockContainer } from '../../../components'
import './User.less'
import { useEditorI18n } from '../../..'

export interface UserProps extends NodeViewRendererProps {}

export const User: React.FC<UserProps> = ({ editor, node }) => {
  const [t] = useEditorI18n()
  const attributes = node.attrs.people ?? {}
  return (
    <BlockContainer as="span" editor={editor}>
      <Avatar
        size="small"
        initials={attributes.name ?? attributes.webid}
        src={attributes.avatarUrl ? attributes.avatarUrl : undefined}
        className="brickdoc-user-block-avatar"
      />
      <span className="brickdoc-user-block-name">{attributes.name || t('user_block.anonymous')}</span>
    </BlockContainer>
  )
}
