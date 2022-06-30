import { toast } from '@mashcard/design-system'
import { useCallback, useState } from 'react'
import { useEditorContext, useEditorI18n } from '../../../../hooks'
import { PageConversationData, usePageDiscussionContext } from '../PageDiscussionContext'
import { CommentedNode } from '../useCommentedNodes'

export function useConversationActions(
  conversationItem: PageConversationData,
  commentedNode: CommentedNode
): {
  onCopyUrl: VoidFunction
  onStatus: VoidFunction
  removeConfirm: {
    visible: boolean
    onShow: VoidFunction
    onConfirm: VoidFunction
    onCancel: VoidFunction
  }
} {
  const [t] = useEditorI18n()
  const { editor } = useEditorContext()

  const { removeConversation, resolveConversation, openConversation } = usePageDiscussionContext()

  const onCopyUrl = useCallback(async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}${window.location.pathname}?discussionMarkId=${commentedNode.markId}`
    )
    void toast.success(t('copy_hint'))
  }, [commentedNode.markId, t])

  const [removeConfirmVisible, setRemoveConfirmVisible] = useState(false)

  const onShowRemove = useCallback(() => setRemoveConfirmVisible(true), [])
  const onCancelRemove = useCallback(() => setRemoveConfirmVisible(false), [])

  const onRemove = useCallback(async () => {
    await removeConversation?.(conversationItem.id)
    editor?.commands.removeDiscussion(commentedNode.position, commentedNode.position + commentedNode.node.nodeSize)
    setRemoveConfirmVisible(false)
  }, [commentedNode.node.nodeSize, commentedNode.position, conversationItem.id, editor?.commands, removeConversation])

  const onStatus = useCallback(() => {
    if (conversationItem.status === 'opened') {
      void resolveConversation?.(conversationItem.id)
    } else {
      void openConversation?.(conversationItem.id)
    }
  }, [conversationItem.id, conversationItem.status, openConversation, resolveConversation])

  return {
    onCopyUrl,
    onStatus,
    removeConfirm: {
      visible: removeConfirmVisible,
      onConfirm: onRemove,
      onShow: onShowRemove,
      onCancel: onCancelRemove
    }
  }
}
