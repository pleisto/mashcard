import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Check, Delete, More } from '@brickdoc/design-icons'
import { Button, ConfirmDialog, css, Menu, Popover, styled, theme, toast } from '@brickdoc/design-system'
import { Link, IconBackground } from '../../ui'
import { Comment, CommentCard } from './Comment'
import { CommentEditorContent, CommentEditorProps } from '../../../editors/commentEditor'
import { useConversationItem } from './useConversationItem'
import { CommentedNode } from './useCommentedNodes'
import { ConversationData, PageDiscussionContext } from './PageDiscussionContext'
import { useEditorContext, useEditorI18n } from '../../../hooks'
import { MentionCommands } from '../../../extensions'

export interface ConversationItem extends ConversationData {}

export interface ConversationProps {
  active: boolean
  commentedNode: CommentedNode
}

const ConversationCard = styled('div', {
  backgroundColor: theme.colors.ceramicPrimary,
  border: `1px solid ${theme.colors.borderSecondary}`,
  borderRadius: '4px',
  boxShadow: '0px 2px 4px rgba(44, 91, 255, 0.02), 0px 4px 4px rgba(0, 0, 0, 0.04)',
  marginBottom: '.5rem',

  [`& ${CommentCard}:last-child`]: {
    paddingBottom: '.5rem'
  }
})

const ConversationHeader = styled('div', {
  alignItems: 'center',
  backgroundColor: theme.colors.backgroundOverlaySecondary,
  display: 'flex',
  flexDirection: 'row',
  padding: '.5rem .75rem'
})

const ContentQuote = styled('blockquote', {
  color: theme.colors.typeSecondary,
  flex: 1,
  fontFamily: 'inherit',
  fontSize: '.75rem',
  lineHeight: '1.125rem',
  margin: 0,
  marginRight: '1rem',
  overflow: 'hidden',
  paddingLeft: '.25rem',
  position: 'relative',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  '&:before': {
    backgroundColor: theme.colors.grey4,
    content: '',
    height: '.75rem',
    left: '-2px',
    position: 'absolute',
    transform: 'translateY(-50%)',
    top: '50%',
    width: '2px'
  }
})

const ActionButton = styled(Button, {
  variants: {
    size: {
      sm: {
        height: '1rem',
        padding: 0,
        width: '1rem',
        '&:hover, &:focus, &:active': {
          background: theme.colors.secondaryHover
        }
      }
    }
  }
})

const ResolvedStateWrapper = styled('span', {
  alignItems: 'center',
  backgroundColor: theme.colors.iconThirdary,
  borderRadius: '1rem',
  display: 'flex',
  height: '1rem',
  justifyContent: 'center',
  width: '1rem',
  variants: {
    state: {
      OPENED: {
        backgroundColor: 'transparent'
      },
      RESOLVED: {
        backgroundColor: theme.colors.iconThirdary,
        color: theme.colors.white
      }
    }
  }
})

const menuIconStyles = css({
  height: '1.3rem',
  width: '1.3rem'
})

export const Conversation: FC<ConversationProps> = ({ active, commentedNode }) => {
  const { editor } = useEditorContext()
  const mentionCommandsOptions =
    editor?.extensionManager.extensions.find(extension => extension.name === MentionCommands.name)?.options ?? {}

  const [t] = useEditorI18n()
  const { addConversation, removeConversation, resolveConversation, openConversation, addComment } =
    useContext(PageDiscussionContext)
  const handleCopyUrl = useCallback(async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}${window.location.pathname}?discussionMarkId=${commentedNode.markId}`
    )
    void toast.success(t('copy_hint'))
  }, [commentedNode.markId, t])

  const conversationItem = useConversationItem(commentedNode)

  const [removeConfirmVisible, setRemoveConfirmVisible] = useState(false)
  const handleRemove = useCallback(async () => {
    await removeConversation?.(conversationItem.id)
    editor?.commands.removeDiscussion(commentedNode.position, commentedNode.position + commentedNode.node.nodeSize)
    setRemoveConfirmVisible(false)
  }, [commentedNode.node.nodeSize, commentedNode.position, conversationItem.id, editor?.commands, removeConversation])

  const handleState = useCallback(() => {
    if (conversationItem.state === 'OPENED') {
      void resolveConversation?.(conversationItem.id)
    } else {
      void openConversation?.(conversationItem.id)
    }
  }, [conversationItem.id, conversationItem.state, openConversation, resolveConversation])

  const handleCommentSent = useCallback<NonNullable<CommentEditorProps['onSend']>>(
    async (editor, content) => {
      if (!content) return

      if (conversationItem.comments.length === 0) {
        await addConversation?.(conversationItem, { content })
      } else {
        await addComment?.(conversationItem.id, { content })
      }

      editor.commands.clearContent(true)
    },
    [addComment, addConversation, conversationItem]
  )

  // remove discussion mark if no comment added when discussion panel closed
  const unmounted = useRef(false)
  useEffect(() => {
    return () => {
      unmounted.current = true
    }
  }, [])
  useEffect(() => {
    return () => {
      if (!unmounted.current) return
      if (conversationItem.comments.length === 0) {
        editor?.commands.removeDiscussion(commentedNode.position, commentedNode.position + commentedNode.node.nodeSize)
      }
    }
  }, [commentedNode, conversationItem.comments.length, editor])

  return (
    <ConversationCard>
      <ConversationHeader>
        <ContentQuote>{conversationItem.quotedContent}</ContentQuote>
        <Popover
          compact={true}
          content={
            <Menu>
              <Menu.Item
                itemKey="copy"
                onAction={handleCopyUrl}
                icon={<Link className={menuIconStyles()} square={true} />}
                label={t('action_panel.more.copy')}
              />
              <Menu.Item
                itemKey="delete"
                onAction={() => setRemoveConfirmVisible(true)}
                icon={
                  <IconBackground className={menuIconStyles()}>
                    <Delete />
                  </IconBackground>
                }
                label={t('action_panel.more.delete')}
              />
            </Menu>
          }
          placement="bottomEnd"
          trigger="click"
          // stick it to aside panel
          // avoid popover locate at wrong place when discussion list be scrolled
          getPopupContainer={() => document.getElementById('aside') ?? document.body}>
          <ActionButton type="text" size="sm" icon={<More />} />
        </Popover>
        <ActionButton
          onClick={handleState}
          type="text"
          size="sm"
          icon={
            <ResolvedStateWrapper state={conversationItem.state}>
              <Check />
            </ResolvedStateWrapper>
          }
        />
      </ConversationHeader>
      {conversationItem.state === 'OPENED' && (
        <>
          {conversationItem.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
          {active && (
            <CommentEditorContent
              mentionCommandsOptions={mentionCommandsOptions}
              markId={commentedNode.markId}
              onSend={handleCommentSent}
            />
          )}
        </>
      )}
      <ConfirmDialog
        confirmBtnText={t('action_panel.more.delete_confirm')}
        cancelBtnText={t('action_panel.more.delete_cancel')}
        onCancel={() => setRemoveConfirmVisible(false)}
        onConfirm={handleRemove}
        open={removeConfirmVisible}>
        {t('discussion.delete_message')}
      </ConfirmDialog>
    </ConversationCard>
  )
}
