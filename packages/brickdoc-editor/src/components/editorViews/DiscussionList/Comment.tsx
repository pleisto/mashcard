import { FC, Fragment, ReactNode } from 'react'
import { Avatar, styled, theme } from '@brickdoc/design-system'
import { CommentData } from './PageDiscussionContext'
import { JSONContent } from '@tiptap/core'
import { meta as ParagraphMeta } from '../../../extensions/blocks/paragraph/meta'
import { meta as TextMeta } from '../../../extensions/blocks/text/meta'
import { meta as UserMeta, UserAttributes } from '../../../extensions/blocks/user/meta'
import { User } from '../../ui'

export interface CommentProps {
  comment: CommentItem
}

export interface CommentItem extends CommentData {}

export const CommentCard = styled('div', {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'row',
  padding: '.5rem .75rem 0'
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

const CommentContent = styled('div', {
  p: {
    fontSize: theme.fontSizes.callout,
    fontWeight: 400,
    lineHeight: '1.125rem',
    marginBottom: 0
  }
})

const renderParagraph = (content: JSONContent): ReactNode => {
  return <p>{content.content?.map((content, index) => renderContent(content, index))}</p>
}

const renderText = (content: JSONContent): ReactNode => {
  return <span>{content.text}</span>
}

const renderUser = (content: JSONContent): ReactNode => {
  return <User attributes={(content.attrs ?? {}) as UserAttributes} options={{ size: 'sm' }} />
}

const renderContent = (content: JSONContent, index?: number): ReactNode => {
  let renderedContent: ReactNode = null
  switch (content.type) {
    case ParagraphMeta.name:
      renderedContent = renderParagraph(content)
      break
    case TextMeta.name:
      renderedContent = renderText(content)
      break
    case UserMeta.name:
      renderedContent = renderUser(content)
      break
  }
  return <Fragment key={index}>{renderedContent}</Fragment>
}

export const Comment: FC<CommentProps> = ({ comment }) => {
  return (
    <CommentCard>
      <Avatar size="sm" />
      <CommentMain>
        <div>
          <Username>Ziyan</Username>
          <CommentAt>11:24</CommentAt>
        </div>
        <CommentContent>{comment.content.content?.map(renderContent)}</CommentContent>
      </CommentMain>
    </CommentCard>
  )
}
