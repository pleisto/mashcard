import { useContext } from 'react'
import { isEmpty } from '@brickdoc/active-support'
import { styled, Avatar, theme } from '@brickdoc/design-system'
import { EditorContext } from '../../../context/EditorContext'
import { UserAttributes, UserOptions } from '../../../extensions/blocks/user/meta'

export interface UserProps {
  attributes: UserAttributes
  options?: UserOptions
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

export const User: React.FC<UserProps> = ({ attributes, options }) => {
  const { name, domain, avatarUrl } = attributes?.people ?? {}
  const size = options?.size ?? 'md'
  const { t } = useContext(EditorContext)
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
