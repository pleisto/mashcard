import { useContext, useMemo } from 'react'
import { ConversationItem } from './Conversation'
import { PageDiscussionContext } from './PageDiscussionContext'
import { CommentedNode } from './useCommentedNodes'

export function useConversationItem(commentedNode: CommentedNode): ConversationItem {
  const { discussion } = useContext(PageDiscussionContext)

  const conversationData = useMemo(
    () => discussion.conversations.find(conversation => conversation.markId === commentedNode.markId),
    [commentedNode.markId, discussion.conversations]
  )

  const quotedContent = useMemo(
    () => conversationData?.quotedContent ?? commentedNode.node.textContent,
    // quoted content should be first time quoted content
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [conversationData]
  )

  return useMemo(
    () => ({
      id: conversationData?.id ?? Number(new Date()),
      quotedContent,
      state: conversationData?.state ?? 'OPENED',
      markId: conversationData?.markId ?? commentedNode.markId,
      comments: conversationData?.comments ?? []
    }),
    [commentedNode.markId, conversationData, quotedContent]
  )
}
