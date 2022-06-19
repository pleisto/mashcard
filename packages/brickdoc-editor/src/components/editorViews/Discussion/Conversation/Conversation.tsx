import { FC, useMemo } from 'react'
import { Check, Delete, More } from '@brickdoc/design-icons'
import { ConfirmDialog, Menu, Popover } from '@brickdoc/design-system'
import { Link, IconBackground } from '../../../ui'
import { Comment } from '../Comment'
import { CommentEditorContent } from '../../../../editors/commentEditor'
import { useConversationItem } from './useConversationItem'
import { CommentedNode } from '../useCommentedNodes'
import { useEditorContext, useEditorI18n } from '../../../../hooks'
import { MentionCommands } from '../../../../extensions'
import {
  ConversationCard,
  ConversationHeader,
  ContentQuote,
  menuIconStyles,
  ActionButton,
  ResolvedStateWrapper
} from './Conversation.style'
import { useConversationActions } from './useConversationActions'
import { useConversationEffects } from './useConversationEffects'

export interface ConversationProps {
  active: boolean
  commentedNode: CommentedNode
}

export const Conversation: FC<ConversationProps> = ({ active, commentedNode }) => {
  const { editor } = useEditorContext()
  const mentionCommandsOptions = useMemo(
    () => editor?.extensionManager.extensions.find(extension => extension.name === MentionCommands.name)?.options ?? {},
    [editor?.extensionManager.extensions]
  )
  const [t] = useEditorI18n()
  const conversationItem = useConversationItem(commentedNode)
  const {
    onCopyUrl,
    onStatus,
    removeConfirm: {
      visible: removeConfirmVisible,
      onCancel: onRemoveCancel,
      onShow: onRemoveShow,
      onConfirm: onRemoveConfirm
    }
  } = useConversationActions(conversationItem, commentedNode)
  const { onCommentSent } = useConversationEffects(conversationItem, commentedNode)

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
                onAction={onCopyUrl}
                icon={<Link className={menuIconStyles()} square={true} />}
                label={t('action_panel.more.copy')}
              />
              <Menu.Item
                itemKey="delete"
                onAction={onRemoveShow}
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
          onClick={onStatus}
          type="text"
          size="sm"
          icon={
            <ResolvedStateWrapper status={conversationItem.status}>
              <Check />
            </ResolvedStateWrapper>
          }
        />
      </ConversationHeader>
      {conversationItem.status === 'opened' && (
        <>
          {conversationItem.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
          {active && (
            <CommentEditorContent
              mentionCommandsOptions={mentionCommandsOptions}
              markId={commentedNode.markId}
              onSend={onCommentSent}
            />
          )}
        </>
      )}
      <ConfirmDialog
        confirmBtnText={t('action_panel.more.delete_confirm')}
        cancelBtnText={t('action_panel.more.delete_cancel')}
        onCancel={onRemoveCancel}
        onConfirm={onRemoveConfirm}
        open={removeConfirmVisible}>
        {t('discussion.delete_message')}
      </ConfirmDialog>
    </ConversationCard>
  )
}
