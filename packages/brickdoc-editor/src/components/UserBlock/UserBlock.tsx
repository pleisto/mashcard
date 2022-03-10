import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { Avatar, styled, theme } from '@brickdoc/design-system'
import { isEmpty } from '@brickdoc/active-support'
import { BlockContainer } from '../BlockContainer'
import { EditorContext } from '../../context/EditorContext'
import { UserBlockOptions } from '../../extensions'

export interface UserBlockProps extends NodeViewProps {}

export interface UserRenderProps {
  attributes: {
    people?: {
      name?: string
      domain?: string
      avatarUrl?: string
    }
  }
  options?: UserBlockOptions
}

const UserBlockAvatar = styled(Avatar, {
  marginRight: '.25rem',
  variants: {
    size: {
      sm: {
        width: '1.25rem',
        height: '1.25rem',
        lineHeight: '1.25rem',
        fontSize: '1.25rem'
      }
    }
  }
})

const UserName = styled('span', {
  color: theme.colors.primaryHover,
  variants: {
    size: {
      md: {
        fontSize: theme.fontSizes.body,
        lineHeight: '1.5rem'
      },
      sm: {
        fontSize: theme.fontSizes.callout,
        lineHeight: '1.125rem'
      }
    }
  }
})

const UserBlockContainer = styled('span', {
  alignItems: 'center',
  display: 'inline-flex',
  flexDirection: 'row'
})

export const User: React.FC<UserRenderProps> = ({ attributes, options }) => {
  const { name, domain, avatarUrl } = attributes?.people ?? {}
  const size = options?.size ?? 'md'
  const { t } = React.useContext(EditorContext)
  const showAvatar = size !== 'sm'

  return (
    <UserBlockContainer>
      {showAvatar && (
        <UserBlockAvatar size="sm" initials={name ?? domain} src={isEmpty(avatarUrl) ? undefined : avatarUrl} />
      )}
      <UserName size={size}>
        {size === 'sm' && '@'}
        {isEmpty(name) ? t('user_block.anonymous') : name}
      </UserName>
    </UserBlockContainer>
  )
}

export const UserBlock: React.FC<UserBlockProps> = ({ node, extension }) => {
  return (
    <BlockContainer inline={true}>
      <User attributes={node.attrs} options={extension.options} />
    </BlockContainer>
  )
}
