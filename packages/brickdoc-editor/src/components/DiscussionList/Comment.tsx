import { FC } from 'react'
import { Avatar, styled, theme } from '@brickdoc/design-system'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CommentProps {}

const CommentCard = styled('div', {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '1rem',
  padding: '.5rem .75rem'
})

const CommentMain = styled('div', {
  flex: 1,
  marginLeft: '.75rem'
})

const Username = styled('span', {
  color: theme.colors.typePrimary,
  fontSize: theme.fontSizes.callout,
  fontWeight: 500,
  lineHeight: '1.125rem'
})

const CommentAt = styled('span', {
  color: theme.colors.typeThirdary,
  fontSize: '.625rem',
  lineHeight: '1.125rem',
  marginLeft: '.5rem'
})

export const Comment: FC<CommentProps> = () => {
  return (
    <CommentCard>
      <Avatar />
      <CommentMain>
        <div>
          <Username>Ziyan</Username>
          <CommentAt>11:24</CommentAt>
        </div>
        <div>
          content content content content content content content content content content content content content
          content content content content content content content content content content content{' '}
        </div>
      </CommentMain>
    </CommentCard>
  )
}
